interface ICriteria {
  id: string;
  label: string;
  library: string;
  checked: boolean;
}

const PASSWORD_CRITERIA: ICriteria[] = [
  {
    id: 'lowercase',
    label: 'a-z',
    library: 'abcdefghijklmnopqrstuvwxyz',
    checked: true,
  },
  {
    id: 'uppercase',
    label: 'A-Z',
    library: 'ABCDEFGHIJKLMNOPWRSTUVWXYZ',
    checked: true,
  },
  {
    id: 'numbers',
    label: '0-9',
    library: '0123456789',
    checked: true,
  },
  {
    id: 'symbols',
    label: '!-?',
    library: '#?!@$%^&*-',
    checked: false,
  },
];

declare global {
  interface String {
    pick(min: number, max?: number): string;

    shuffle(): string;
  }
}

String.prototype.pick = function(min: number, max?: number) {
  let n: number,
    chars = '';

  if (typeof max === 'undefined') {
    n = min;
  } else {
    n = min + Math.floor(Math.random() * (max - min + 1));
  }

  for (let i = 0; i < n; i++) {
    chars += this.charAt(Math.floor(Math.random() * this.length));
  }

  return chars;
};

String.prototype.shuffle = function() {
  const array: string[] = this.split('');
  let tmp: string;
  let current: number;
  let top = array.length;

  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

  return array.join('');
};

export const generatePassword = (
  uppercase = true,
  numbers = true,
  symbols = true,
  lowercase = true,
  passwordLength = 15,
): string => {
  if (
    lowercase === false ||
    uppercase === false ||
    numbers === false ||
    symbols === false
  ) {
    return '';
  }
  const all =
    PASSWORD_CRITERIA[0].library +
    PASSWORD_CRITERIA[1].library +
    PASSWORD_CRITERIA[2].library +
    PASSWORD_CRITERIA[3].library;

  let password = '';
  password += PASSWORD_CRITERIA[0].library.pick(1);
  password += PASSWORD_CRITERIA[1].library.pick(1);
  password += PASSWORD_CRITERIA[2].library.pick(1);
  password += PASSWORD_CRITERIA[3].library.pick(1);

  password += all.pick(4, passwordLength);
  password = password.shuffle();
  return password;
};
