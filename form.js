// Support form: requests are relayed by e-mail through Web3Forms.
// The access key only identifies the form; the receiving address stays private.
const WEB3FORMS_KEY = "f7115c59-1b8b-4f0c-baed-cd2a6921517d";

document.querySelectorAll("form.support").forEach((form) => {
  const status = form.querySelector(".status");
  const button = form.querySelector("button");
  const text = form.dataset;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", `Easy Score: ${data.get("topic")}`);
    data.append("from_name", "Easy Score support");
    button.disabled = true;
    status.textContent = text.sending;
    status.className = "status";
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      form.reset();
      status.textContent = text.sent;
      status.className = "status ok";
    } catch {
      status.textContent = text.failed;
      status.className = "status error";
    } finally {
      button.disabled = false;
    }
  });
});
