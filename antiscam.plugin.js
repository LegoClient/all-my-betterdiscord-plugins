/**
 * @name Anti-Phishing
 * @version 0.1.0
 * @description Detects phishing scams in messages and sends a toast. On shutdown, sends alert. On startup, sends changelog alert.
 * @author kno
 * @source https://github.com/MDev123/betterdiscord-scamblock/
 * @updateUrl https://github.com/MDev123/betterdiscord-scamblock/blob/main/antiscam.plugin.js
 */

const config = {
    info: {
      name: "Anti-Phishing",
      authors: [
        {
          name: "kno"
        }
      ],
      version: "1.0.0",
      description: "Detects phishing scams in messages and sends a toast.",
      github: "https://github.com/your/repo"
    },
    defaultConfig: []
  };
  
  module.exports = class AntiPhishing {
    constructor() {
      this.keywords = [
        "password",
        "login",
        "phishing",
        "hacked",
        "compromised",
        "security",
        "verification",
        "verify",
        "account",
        "account suspended",
        "account deactivated",
        "account locked",
        "account compromised",
        "account hacked",
        "account phishing",
        "account verification",
        "account verify",
        "bank",
        "credit card",
        "social security",
        "ssn",
        "identity theft",
        "fraud",
        "spoofing",
        "scam",
        "malware",
        "ransomware",
        "virus"
      ];
    }
  
    start() {
      console.log("[Anti-Phishing] Plugin started.");
      
      // Show changelog
      const changelog = `# Changelog\n\nVersion 1.0.0\n- Initial release\n`;
      BdApi.alert("Anti-Phishing", changelog);
  
      BdApi.onMessageReceived("Anti-Phishing", (event) => {
        const message = event.message.content.toLowerCase();
        const isPhishing = this.keywords.some((keyword) => message.includes(keyword));
  
        if (isPhishing) {
          BdApi.showToast("Scam Detected!!", { type: "warning" });
        }
      });
    }
  
    stop() {
      console.log("[Anti-Phishing] Plugin stopped.");
      BdApi.alert("Anti-Phishing", "Anti-Phishing plugin has been shutdown.");
    }
  };
  
