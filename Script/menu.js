import gsap from "https://cdn.skypack.dev/gsap@3.10.4";

// 1. aria属性を使った書き方
document.querySelectorAll("[data-accordion]").forEach((button) => {
  const content = document.getElementById(button.getAttribute("aria-controls"));

  const onClick = () => {
    if (button.getAttribute("aria-expanded") === "false") {
      button.setAttribute("aria-expanded", true);
      content.setAttribute("aria-hidden", false);
      gsap.fromTo(
        content,
        { height: 0, clearProps: "display" },
        { height: "auto" }
      );
    } else {
      button.setAttribute("aria-expanded", false);
      content.setAttribute("aria-hidden", true);
      gsap.to(content, { height: 0, display: "none" });
    }
  };
  button.addEventListener("click", onClick);

  // 初期化
  if (button.getAttribute("aria-expanded") === "false") {
    content.setAttribute("aria-hidden", true);
    gsap.set(content, { height: 0, display: "none" });
  }
});

// 2. details, summary を使った書き方
// ※アニメーションが必要なければ、JSは不要
document.querySelectorAll("details").forEach((details) => {
  const summary = details.querySelector("summary");
  const content = details.querySelector("summary + *");

  const onClick = (event) => {
    if (details.open) {
      // 閉じるアニメーションのみ preventDefault が必要
      event.preventDefault();
      details.setAttribute("data-accordion-before-close", "");
      gsap.to(content, {
        height: 0,
        onComplete: () => {
          details.open = false;
          details.removeAttribute("data-accordion-before-close");
        },
      });
    } else {
      gsap.fromTo(content, { height: 0 }, { height: "auto" });
    }
  };

  summary.addEventListener("click", onClick, { passive: false });
});