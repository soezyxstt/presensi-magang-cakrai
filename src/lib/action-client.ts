import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleReturnedServerError: (_error) => {
    return "There was an error occurred!";
  },
});
