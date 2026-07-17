const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome-stable", headless: "new", args:["--no-sandbox","--disable-setuid-sandbox"]});
  const p = await b.newPage();
  const errs=[];
  p.on("pageerror",e=>errs.push("PAGEERR: "+e.message));
  p.on("console",m=>{if(m.type()==="error")errs.push("CONSOLE: "+m.text());});
  await p.goto("http://localhost:3000/login",{waitUntil:"networkidle0"});
  await p.type('#email','demo@pathwise.dev');
  await p.type('#password','Demo1234!');
  await p.evaluate(()=>[...document.querySelectorAll('button')].find(b=>/sign in/i.test(b.textContent||'')).click());
  await new Promise(r=>setTimeout(r,4500));
  await p.goto("http://localhost:3000/assistant",{waitUntil:"networkidle0"});
  await new Promise(r=>setTimeout(r,2500));
  console.log("URL:", p.url());
  async function clickFirstOption() {
    return p.evaluate(() => {
      const btns = [...document.querySelectorAll('main button')];
      // option buttons are inside the grid (have a span child text)
      const opt = btns.find(b => b.querySelector('span') && /Next\.js|Python|Frontend|Go|TypeScript|Data Structures|weeks|min|hour|day/i.test(b.textContent||''));
      if (opt) { opt.click(); return opt.textContent.trim(); }
      return null;
    });
  }
  for (let i=0;i<3;i++){
    const clicked = await clickFirstOption();
    console.log(`step ${i+1} clicked:`, clicked);
    await new Promise(r=>setTimeout(r,3500));
  }
  const txt = await p.evaluate(()=>document.querySelector('main')?.innerText?.slice(0,400)||"no main");
  console.log("FINAL MAIN:\n", txt);
  console.log("\nERRORS:\n"+(errs.join("\n---\n")||"none"));
  await b.close();
})();
