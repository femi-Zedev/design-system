export const password_requirements = [
  { re: /[0-9]/, label: 'At least one number' },
  { re: /[a-z]/, label: 'At least one lowercase letter' },
  { re: /[A-Z]/, label: 'At least one uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'At least one special character' },
];

export const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/[^\s]+/i;



export function checkPasswordRequirements(value: string) {
  for (let i = 0; i < password_requirements.length; i++) {
    if (!password_requirements[i].re.test(value)) {
      return `Password must ${password_requirements[i].label.toLowerCase()}`;
    }
  }
  return null; // No errors, all requirements are met
}

export function getStrength(password: string) {
  let multiplier = password.length >= 10 ? 0 : 1;

  password_requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (password_requirements.length + 1)) * multiplier, 10);
}
