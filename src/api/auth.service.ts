import { BehaviorSubject } from "rxjs";

// In a repo called "api", you may export functions from the repo's entry file.
// These functions will be available to single-spa application, parcels, and other in-browser modules
// via an import statement.

// Functions, components, logic, and environment variables.
// API data
// UI state

const SESSION_KEY = "sessionToken";

interface IAuthObject {
  sessionToken: string;
  pending: boolean;
  error?: string;
}

export const auth$ = new BehaviorSubject<IAuthObject>({
  sessionToken: localStorage.getItem(SESSION_KEY),
  pending: false,
});

export class AuthService {
  private authenticate(username, password): Promise<IAuthObject> {
    return new Promise((resolve, reject) => {
      auth$.next({
        sessionToken: null,
        pending: true,
      });
      setTimeout(() => {
        if (username === "username123" && password === "password123") {
          const sessionToken = "tokenTokenToken";
          localStorage.setItem(SESSION_KEY, sessionToken);
          resolve({
            sessionToken,
            pending: false,
          });
        } else {
          // Why resolve when invalid? Because the "backend" provided a valid response
          resolve({
            sessionToken: null,
            error: "Invalid user or password",
            pending: false,
          });
        }
      }, 2000);
    });
  }

  public login(username, password) {
    if (!auth$.value.pending) {
      this.authenticate(username, password).then((res) => auth$.next(res));
    }
  }

  public logout() {
    // Trigger side-effects
    localStorage.removeItem(SESSION_KEY);
    auth$.next({
      pending: false,
      sessionToken: null,
    });
  }
}
