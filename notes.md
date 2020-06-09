1. Setup pug
   1. pug watch (pug-cli) package.json (pug-cli)[https://www.npmjs.com/package/pug-cli]
   2. disable compile hero extension (everything except TypeScritpt) code > preferences > settings > workspace > compileHero
      1. We're using TypeScript for this project [TypeScript for DOM](https://www.typescriptlang.org/v2/docs/handbook/dom-manipulation.html) [DOM typedefs](https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts). No. Scratch this idea. After reading more about this - there's TypeScript (of type def for Node.js) and I'll learn more about this when I start working with Node (or more server-side code).
2. set up sass keep it simple - no need for different directories - just compile main.scss and use that
3. setup git (local and remote)
4. Sketch things out before you start.
   1. Visualize your data/model and how it will be manipulated and/or tracked and how the view will reflect those state changes.
   2. Create a hypothesis on how you thing something should/will work.
   3. If it fails figure out why and how to prove that really is the actual reason it failed.
   4. If it works take notes so you remember
   5. rinse. repeat.
