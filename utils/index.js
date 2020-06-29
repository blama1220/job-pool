const jsCookie = require("js-cookie");
let Cookies = jsCookie;

module.exports = {
   logOut: () => {
      Cookies.remove("userInformation");
      window.location.replace("/");
    },
   checkSession: () => {
      return Cookies.get("userInformation") != undefined;
  },
   getUserType: () => {
      const userObject = Cookies.get("userInformation");
      return userObject.type;
   },
   getUserInfo: () => {
      return Cookies.get("userInformation")
   },
   setSession: (userData) => {
      Cookies.set("userInformation", userData);
   }
 };
  