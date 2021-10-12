interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  }
}

export function signIn() {
  return new Promise<Response>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        token: 'xvz1evFS4wEEPTGEFPHBog:L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg',
        user: {
          name: 'Yago Neno',
          email: 'developer.neno@gmail.com'
        }
      });
    }, 2000);
  });
}