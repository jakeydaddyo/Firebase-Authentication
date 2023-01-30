const resources = {
    "landingPage.splashText":document.querySelector('#loaderText'),
    "landingPage.resource":document.querySelector('#resource'),
    "navPage.splash":document.querySelector('#splash'),
    "navPage.home":document.querySelector('#home'),
    "landingPage.google":document.querySelector('#signInWithGoogle'),
    "coins.home":document.querySelector('#coinCount'),
    "home.logout":document.querySelector('#logout'),
    "tile.singlePlayer":document.querySelector('.card[data-role="singleplayer"]')
  }



export function resourceManager(pair) {
    console.log('t');
      function main(pair) {
        const {resource, operation} = pair;
        switch(operation) {
            case "setAttribute":
                {
                    const {attributes:{attr1, attr2}} = pair;
                    resources?.[resource]?.[operation](attr1, attr2);
                    break;
                }
            case "innerText":
                {
                    const {attributes:{attr1}} = pair;
                    resources[resource].innerText=attr1;
                    break;
                }
            case "addEventListener":
                {
                    const {attributes:{attr1, attr2}} = pair;
                    resources?.[resource].addEventListener(attr1,attr2);
                    break;
                }
        }
      }
      console.log(typeof pair);
    !Array.isArray(pair) ? (()=>{
        console.log('...?');
        main(pair);
    })() : (()=>{
        pair.forEach(element => {
            console.log(element);
            main(element);
        });
    })();
      
}