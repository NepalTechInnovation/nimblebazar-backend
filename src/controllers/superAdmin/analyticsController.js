const analyticsService = require('../../services/superAdmin/analyticsService');
const ApiResponse = require('../../utils/ApiResponse');
const Messages = require('../../constants/messages');
exports.fetchDashboardSummary = async (req, res) => {
  try {

    const summary = await analyticsService.fetchDashboardSummary(req.user.id);
    res.status(200).json(new ApiResponse(200, Messages.DASHBOARD.FETCH_SUCCESS, summary, "summary"))
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.fetchMonthlyMetrics = async (req, res) => {
  try {
    const metrics = await analyticsService.fetchMonthlyMetrics(req.user.id);
    res.status(200).json(new ApiResponse(200, Messages.DASHBOARD.FETCH_SUCCESS, metrics, "metrics"))
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
