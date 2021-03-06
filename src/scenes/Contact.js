import BaseScene from "./BaseScene";

class ContactScene extends BaseScene {
  constructor(config) {
    super("ContactScene", { ...config, canGoBack: true });

    this.menu = [{ scene: null, text: "" }];
  }

  create() {
    super.create();

    this.cursorOver = this.sound.add("cursorOver");
    this.cursorOver.volume = 0.4;

    this.select = this.sound.add("select");
    this.select.volume = 0.4;

    this.pageFlip = this.sound.add("page-flip");
    this.pageFlip.volume = 0.4;

    this.createCloseButton();
    this.createGithubButton();
    this.createLinkedInButton();
    this.createEmailButton();

    this.add
      .image(this.config.width / 2, this.config.height / 2, "panel-2")
      .setOrigin(0.5)
      .setScale(1, 0.7);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header-shadow")
      .setOrigin(0.5)
      .setScale(0.9);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header")
      .setOrigin(0.5)
      .setScale(0.9);

    this.add
      .text(this.config.width / 2, this.config.height / 6, "CONTACT", {
        fontFamily: "customFont",
        fontSize: "72px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("#D9B48FFF");

    this.add
      .text(this.config.width / 1.75, 220, "https://github.com/Tandid", {
        fontFamily: "customFont",
        fontSize: "40px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("0x000");

    this.add
      .text(
        this.config.width / 1.75 + 20,
        320,
        "https://www.linkedin.com/in/tandidalam/",
        {
          fontFamily: "customFont",
          fontSize: "40px",
        }
      )
      .setOrigin(0.5, 0.5)
      .setColor("0x000");

    this.add
      .text(this.config.width / 1.75, 420, "tandid.alam@gmail.com", {
        fontFamily: "customFont",
        fontSize: "40px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("0x000");
  }

  openLink(url) {
    const s = window.open(url, "_blank");
    if (s && s.focus) s.focus();
    else if (!s) {
      window.location.href = url;
    }
  }

  createCloseButton() {
    const closeBtn = this.add
      .image(
        this.config.width / 1.1 - 20,
        this.config.height / 7 + 20,
        "close-btn"
      )
      .setOrigin(0.5)
      .setScale(0.7)
      .setInteractive()
      .setDepth(2);

    closeBtn.on("pointerup", () => {
      this.select.play();
      this.scene.wake("MenuScene");
      this.scene.stop("ContactScene");
    });

    closeBtn.on("pointerover", () => {
      this.cursorOver.play();
      closeBtn.setTint(0xff6666);
    });

    closeBtn.on("pointerout", () => {
      closeBtn.clearTint();
    });
  }

  createGithubButton() {
    const githubBtn = this.add
      .image(this.config.width / 4, 220, "github")
      .setOrigin(0.5)
      .setScale(0.15)
      .setDepth(2)
      .setInteractive();

    githubBtn.on("pointerup", () => {
      this.openLink("https://github.com/tandid"), this;
    });

    githubBtn.on("pointerover", () => {
      this.cursorOver.play();
      githubBtn.setScale(0.17);
    });

    githubBtn.on("pointerout", () => {
      githubBtn.setScale(0.15);
    });
  }

  createLinkedInButton() {
    const linkedinBtn = this.add
      .image(this.config.width / 4, 320, "linkedin")
      .setOrigin(0.5)
      .setScale(0.15)
      .setDepth(2)
      .setInteractive();

    linkedinBtn.on("pointerup", () => {
      this.openLink("https://www.linkedin.com/in/tandidalam/"), this;
    });

    linkedinBtn.on("pointerover", () => {
      this.cursorOver.play();
      linkedinBtn.setScale(0.17);
    });

    linkedinBtn.on("pointerout", () => {
      linkedinBtn.setScale(0.15);
    });
  }

  createEmailButton() {
    const emailBtn = this.add
      .image(this.config.width / 4, 420, "gmail")
      .setOrigin(0.5)
      .setScale(0.15)
      .setDepth(2)
      .setInteractive();

    emailBtn.on("pointerover", () => {
      this.cursorOver.play();
      emailBtn.setScale(0.17);
    });

    emailBtn.on("pointerout", () => {
      emailBtn.setScale(0.15);
    });
  }
}

export default ContactScene;
