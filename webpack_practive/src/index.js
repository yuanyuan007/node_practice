// src/index.js
import _ from 'lodash';

const greeting = () => {
  console.log('Hello, Webpack, Babel, and Dev Server!');
};

greeting();

const logoImg = new Image();
logoImg.src = require('./assets/image/1.jpeg');
logoImg.classList.add('logo');

document.body.appendChild(logoImg);

// 懒加载
document.addEventListener('click', () => {
  import(/* webpackChunkName: "lazy-loaded" */ './lazy-loaded.js')
    .then((lazyLoadedModule) => {
      lazyLoadedModule.default();
    })
    .catch((error) => {
      console.error('Lazy loading failed', error);
    });
});


// 热模块替换
if (module.hot) {
  module.hot.accept('./lazy-loaded.js', () => {
    console.log('Lazy-loaded module updated');
  });
}