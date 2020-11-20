export const replaceStr = (
    originalStr: string,
    matchString: any,
    replacebleString: any
  ) => {
    if (
      originalStr &&
      typeof matchString !== "undefined" &&
      typeof replacebleString !== "undefined"
    ) {
      return originalStr.replace(matchString, replacebleString);
    }
    return originalStr;
  };
  

  export const isEmailIdValid = (email: string) => {
    const EmailRegEx: any = '[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+';
    return email.match(EmailRegEx) ? true : false
  };