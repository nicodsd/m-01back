import Analytics from "../../models/Analytics.js";

// Increment the visits counter by 1
export const trackVisit = async (req, res, next) => {
  try {
    const { user_id } = req.body; // Expecting user_id in body
    if (!user_id) return res.status(400).json({ success: false, message: "user_id is required" });

    // Find analytics doc or create it
    let analytics = await Analytics.findOne({ user_id });
    if (!analytics) {
      analytics = new Analytics({ user_id, visits: 1, topDishes: [] });
    } else {
      analytics.visits += 1;
    }
    await analytics.save();

    res.status(200).json({ success: true, message: "Visit tracked successfully" });
  } catch (error) {
    next(error);
  }
};

// Add a dish to the topDishes array
export const trackDish = async (req, res, next) => {
  try {
    const { user_id, dishName } = req.body; // Expecting both in body

    if (!user_id || !dishName) {
      return res.status(400).json({ success: false, message: "user_id and dishName are required" });
    }

    let analytics = await Analytics.findOne({ user_id });
    if (!analytics) {
      analytics = new Analytics({ user_id, visits: 0, topDishes: [dishName] });
    } else {
      analytics.topDishes.push(dishName);
    }
    await analytics.save();

    res.status(200).json({ success: true, message: "Dish tracked successfully" });
  } catch (error) {
    next(error);
  }
};

// Get the analytics for a specific user
export const getAnalytics = async (req, res, next) => {
  try {
    const user_id = req.user._id; // Assuming user is injected by authentication middleware

    let analytics = await Analytics.findOne({ user_id });
    if (!analytics) {
      // Return empty analytics if none exists yet
      return res.status(200).json({
        success: true,
        analytics: { visits: 0, topDishes: [] }
      });
    }

    res.status(200).json({
      success: true,
      analytics
    });
  } catch (error) {
    next(error);
  }
};
