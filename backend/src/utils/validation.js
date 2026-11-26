const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates registration input and returns normalized data or validation errors.
 */
export function validateRegistrationInput(body = {}) {
  const errors = [];
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!name || name.length < 2 || name.length > 100) {
    errors.push({
      field: "name",
      message: "Name must be between 2 and 100 characters."
    });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.push({
      field: "email",
      message: "Please provide a valid email address."
    });
  }

  if (!password || password.length < 8 || password.length > 128) {
    errors.push({
      field: "password",
      message: "Password must be between 8 and 128 characters."
    });
  } else if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
    errors.push({
      field: "password",
      message: "Password must contain at least one letter and one number."
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: { name, email, password }
  };
}

/**
 * Validates login input and returns normalized credentials or validation errors.
 */
export function validateLoginInput(body = {}) {
  const errors = [];
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.push({
      field: "email",
      message: "Please provide a valid email address."
    });
  }

  if (!password) {
    errors.push({
      field: "password",
      message: "Password is required."
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: { email, password }
  };
}

