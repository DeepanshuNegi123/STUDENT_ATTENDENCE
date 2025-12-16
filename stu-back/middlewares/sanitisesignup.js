// sanitiser.js
const signupsanitiser = (req, res, next) => {
  console.log("RAW BODY RECEIVED:", req.body);
  console.log("REQUEST PATH:", req.path);

  // TRIM
  function trimIt(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = obj[key].trim();
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        trimIt(obj[key]);
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
    trimIt(req.body);
    scriptRemover(req.body);
    recursiveFiltering(req.body);
  }

  // SIGNUP VALIDATION
  function validateSignupForm(body) {
    // Full Name validation
    if (!body.fullName || body.fullName.trim().length === 0) {
      return { success: false, error: "Full name is required." };
    }
    if (body.fullName.length < 2) {
      return { success: false, error: "Name must be at least 2 characters." };
    }
    if (body.fullName.length > 50) {
      return { success: false, error: "Name must be less than 50 characters." };
    }
    if (!/^[a-zA-Z\s]+$/.test(body.fullName)) {
      return { success: false, error: "Name can only contain letters and spaces." };
    }

    // Email validation
    if (!body.email || body.email.trim().length === 0) {
      return { success: false, error: "Email is required." };
    }
    if (!/^\S+@\S+\.\S+$/.test(body.email)) {
      return { success: false, error: "Invalid email format." };
    }

    // Phone validation
    if (!body.phone || body.phone.trim().length === 0) {
      return { success: false, error: "Phone number is required." };
    }
    if (!/^\d{10}$/.test(body.phone)) {
      return { success: false, error: "Phone must be exactly 10 digits." };
    }

    // Password validation
    if (!body.password || body.password.length === 0) {
      return { success: false, error: "Password is required." };
    }
    if (body.password.length < 8) {
      return { success: false, error: "Password must be at least 8 characters." };
    }
    if (!/[A-Z]/.test(body.password)) {
      return { success: false, error: "Password must contain at least one uppercase letter." };
    }
    if (!/[0-9]/.test(body.password)) {
      return { success: false, error: "Password must contain at least one number." };
    }
    if (!/[!@#$%^&*]/.test(body.password)) {
      return { success: false, error: "Password must contain at least one special character (!@#$%^&*)." };
    }

    // Confirm Password validation
    if (!body.confirmPassword || body.confirmPassword.length === 0) {
      return { success: false, error: "Please confirm your password." };
    }
    if (body.password !== body.confirmPassword) {
      return { success: false, error: "Passwords do not match." };
    }

    // Role validation
    if (!body.role || !["teacher", "student", "admin"].includes(body.role)) {
      return { success: false, error: "Invalid role selected." };
    }

    return { success: true };
  }

  // LOGIN VALIDATION
  function validateLoginForm(body) {
    // Either email OR registration number is required
    const hasEmail = body.email && body.email.trim().length > 0;
    const hasRegnumber = body.regnumber && body.regnumber.trim().length > 0;

    if (!hasEmail && !hasRegnumber) {
      return { success: false, error: "Please enter email OR registration number." };
    }

    // If email is provided, validate format
    if (hasEmail) {
      if (!/^\S+@\S+\.\S+$/.test(body.email)) {
        return { success: false, error: "Invalid email format." };
      }
    }

    // If registration number is provided, validate format
    if (hasRegnumber) {
      if (!/^\d+$/.test(body.regnumber)) {
        return { success: false, error: "Registration number must contain only digits." };
      }
      if (body.regnumber.length < 3) {
        return { success: false, error: "Registration number must be at least 3 digits." };
      }
    }

    // Password validation
    if (!body.password || body.password.trim().length === 0) {
      return { success: false, error: "Password is required." };
    }
    if (body.password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters." };
    }

    return { success: true };
  }

  // MASTER CONTROLLER
  function sanitised() {
    xssFilter();

    console.log("SANITIZED BODY:", req.body);

    if (req.path.includes("signup")) {
      const check = validateSignupForm(req.body);
      if (!check.success) {
        console.log("SIGNUP VALIDATION FAILED:", check.error);
        return { stop: true, error: check.error };
      }
    }

    if (req.path.includes("login")) {
      const check = validateLoginForm(req.body);
      if (!check.success) {
        console.log("LOGIN VALIDATION FAILED:", check.error);
        return { stop: true, error: check.error };
      }
    }

    return { stop: false };
  }

  const result = sanitised();

  // ❗ STOP HERE IF VALIDATION FAILED
  if (result.stop) {
    console.log("SANITIZER BLOCKING REQUEST:", result.error);
    return res.status(400).json({ error: result.error });
  }

  console.log("SANITIZER PASSED - PROCEEDING TO CONTROLLER");
  // Continue
  next();
};

export default signupsanitiser;