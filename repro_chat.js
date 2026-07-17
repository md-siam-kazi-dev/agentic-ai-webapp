const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome-stable", headless: "new", args:["--no-sandbox","--disable-setuid-sandbox"]});
  const p = await b.newPage();
  const errs=[];
  p.on("pageerror",e=>errs.push("PAGEERR: "+e.message));
  p.on("console",m=>{if(m.type()==="error")errs.push("CONSOLE: "+m.text());});
  await p.goto("http://localhost:3000/assistant",{waitUntil:"networkidle0"});
  await new Promise(r=>setTimeout(r,2000));
  // try clicking first option
  const opts = await p.$$('button');
  console.log("buttons:", opts.length);
  if (opts[0]) { await opts[0].click(); await new Promise(r=>setTimeout(r,3000)); }
  console.log("URL:", p.url());
  const txt = await p.evaluate(()=>document.querySelector('main')?.innerText?.slice(0,300)||"no main");
  console.log("MAIN:", txt);
  console.log("\nERRORS:\n"+(errs.join("\n---\n")||"none"));
  await b.close();
})();
