const Post = require('../DataBase/Posts');

const getPosts = async (req, res) => {
    const { category = 'all', timeRange = 'all', action = 'all' } = req.body;
    const limit = 20;
    console.log(category, timeRange, action)
    try {
        let query = {};

        if (category !== 'all') query.category = category;
        if (action !== 'all') query.postType = action;

        if (timeRange !== 'all') {
            const now = new Date();
            let startDate;
            switch (timeRange) {
                case 'today':
                    startDate = new Date(now.setHours(0, 0, 0, 0));
                    break;
                case 'this week':
                    startDate = new Date(now.setDate(now.getDate() - now.getDay()));
                    break;
                case 'this month':
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                    break;
                case 'this year':
                    startDate = new Date(now.getFullYear(), 0, 1);
                    break;
                default:
                    startDate = null;
            }
            if (startDate) {
                query.createdAt = { $gte: startDate };
            }
        }

        const posts = await Post.find(query)
            .populate('userId', 'name email')
            .lean();

        const enhancedPosts = posts.map(post => ({
            ...post,
            commentCount: post.comments ? post.comments.length : 0,
            totalInteractions: (post.likes ? post.likes : 0) + (post.comments ? post.comments.length : 0),
            isRecent: (new Date() - new Date(post.createdAt)) < 24 * 60 * 60 * 1000
        }));

        // Sort posts by totalInteractions in descending order
        enhancedPosts.sort((a, b) => b.totalInteractions - a.totalInteractions);

        // Limit the number of posts
        const limitedPosts = enhancedPosts.slice(0, limit);

        return res.json({
            success: true,
            posts: limitedPosts,
            totalPosts: limitedPosts.length,
            hasMore: enhancedPosts.length > limit
        });
    } catch (error) {
        console.error('Error getting posts:', error);
        return res.status(500).json({
            success: false,
            error: 'Error getting posts',
            details: error.message
        });
    }
};

module.exports = getPosts;