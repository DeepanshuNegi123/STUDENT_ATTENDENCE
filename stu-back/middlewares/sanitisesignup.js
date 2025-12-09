// sanitiser.js
const signupsanitiser = (req, res, next) => {


  console.log("RAW BODY RECEIVED:", req.body);

  // TRIM
  function trimit(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = obj[key].trim();
      } 
      else if (typeof obj[key] === "object" && obj[key] !== null) {
        trimit(obj[key]);
      }
    }
  }

  // ESCAPE HTML
  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // RECURSIVE ESCAPING
  function recursiveFiltering(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = escapeHTML(obj[key]);
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        recursiveFiltering(obj[key]);
      }
    }
  }

  // REMOVE SCRIPT TAGS
  function scriptRemover(obj) {
    const scriptRegex = /<script.*?>.*?<\/script>/gi;

    for (let key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = obj[key].replace(scriptRegex, "");
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        scriptRemover(obj[key]);
      }
    }
  }

  // XSS FILTER PIPELINE
  function xssFilter() {
    trimit(req.body);
    scriptRemover(req.body);
    recursiveFiltering(req.body);
  }

  // VALIDATIONS
  function validateSignupForm(body) {
    if (!body.fullname || body.fullname.length < 2) {
      return { success: false, error: "Name must be at least 2 characters." };
    }
    if (!body.email || !/^\S+@\S+\.\S+$/.test(body.email)) {
      return { success: false, error: "Invalid email format." };
    }
    if (!body.password || body.password.length < 6) {
      return { success: false, error: "Password must be 6+ characters." };
    }
    return { success: true };
  }

  function validateLoginForm(body) {
    if (!body.email || !/^\S+@\S+\.\S+$/.test(body.email)) {
      return { success: false, error: "Invalid email format." };
    }
    if (!body.password) {
      return { success: false, error: "Password is required." };
    }
    return { success: true };
  }

  // MASTER CONTROLLER
  function sanitised() {
    xssFilter();

    if (req.path.includes("signup")) {
      const check = validateSignupForm(req.body);
      if (!check.success) return { stop: true, error: check.error };
    }

    if (req.path.includes("login")) {
      const check = validateLoginForm(req.body);
      if (!check.success) return { stop: true, error: check.error };
    }

    return { stop: false };
  }

  const result = sanitised();

  // ❗ STOP HERE IF VALIDATION FAILED
  if (result.stop) {
    return res.status(400).json({ error: result.error });
  }

  // Continue
  next();
};

export default signupsanitiser;
