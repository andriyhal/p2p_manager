import mixpanel from "mixpanel-browser";

export class MixpanelAnalytics {
  static init(apiKey) {
    mixpanel.init(apiKey);
  }

  static startBot(status) {
    if (mixpanel) {
      mixpanel.track("Click button start bot", { statusBot: status });
    }
  }

  static stopBot(status) {
    if (mixpanel) {
      mixpanel.track("Click button stop bot", { statusBot: status });
    }
  }

  static trackTaskAdded(task) {
    mixpanel.track("Task Added", {
      ...task,
    });
  }

  static trackTaskRemoved(task) {
    mixpanel.track("Task Removed", {
      ...task,
    });
  }

  static trackUserActivity(action, userId) {
    mixpanel.track("User Activity", {
      action,
      userId,
    });
  }
}
