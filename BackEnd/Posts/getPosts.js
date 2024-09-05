const Post = require('../DataBase/Posts');

const getPosts = async (req, res) => {
    const { category = 'all' } = req.body;
    const limit = 20; // Number of posts per page
    
    try {
        let query = {};
        if (category !== 'all') {
            query.category = category;
        }

        const posts = await Post.find(query)
            .sort({ createdAt: -1 }) // Sort by most recent first
            .limit(limit)
            .populate('userId', 'name email') // Populate user info, adjust fields as needed
            .lean(); // Convert to plain JavaScript objects for better performance

        // Enhance post objects with additional metadata
        const enhancedPosts = posts.map(post => ({
            ...post,
            commentCount: post.comments ? post.comments.length : 0,
            isRecent: (new Date() - new Date(post.createdAt)) < 24 * 60 * 60 * 1000 // Is less than 24 hours old
        }));

        return res.json({
            success: true,
            posts: enhancedPosts,
            totalPosts: enhancedPosts.length,
            hasMore: enhancedPosts.length === limit // Indicates if there might be more posts to load
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