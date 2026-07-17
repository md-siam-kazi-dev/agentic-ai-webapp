const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome-stable", headless: "new", args:["--no-sandbox","--disable-setuid-sandbox"]});
  const p = await b.newPage();
  const errs=[];
  p.on("pageerror",e=>errs.push("PAGEERR: "+e.message+"\n"+(e.stack||"").split("\n").slice(0,4).join("\n")));
  p.on("console",m=>{if(m.type()==="error")errs.push("CONSOLE: "+m.text());});
  await p.goto("http://localhost:3000/login",{waitUntil:"networkidle0"});
  await p.type('#email','demo@pathwise.dev');
  await p.type('#password','Demo1234!');
  await p.evaluate(()=>[...document.querySelectorAll('button')].find(b=>/sign in/i.test(b.textContent||'')).click());
  await new Promise(r=>setTimeout(r,4500));
  await p.goto("http://localhost:3000/assistant",{waitUntil:"networkidle0"});
  await new Promise(r=>setTimeout(r,1500));
  console.log("on assistant, URL:", p.url());
  let opts = await p.$$('button');
  console.log("initial buttons:", opts.length);
  // click first option (a learning goal)
  if (opts[0]) { await opts[0].click(); await new Promise(r=>setTimeout(r,3500)); }
  opts = await p.$$('button');
  console.log("after step1 buttons:", opts.length);
  if (opts[0]) { await opts[0].click(); await new Promise(r=>setTimeout(r,3500)); }
  opts = await p.$$('button');
  console.log("after step2 buttons:", opts.length);
  if (opts[0]) { await opts[0].click(); await new Promise(r=>setTimeout(r,3500)); }
  const txt = await p.evaluate(()=>document.querySelector('main')?.innerText?.slice(0,500)||"no main");
  console.log("FINAL MAIN:\n", txt);
  console.log("\nERRORS:\n"+(errs.join("\n---\n")||"none"));
  await b.close();
})();
