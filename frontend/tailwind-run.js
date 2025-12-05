import { exec } from "child_process";

exec("npx tailwindcss -i ./styles/globals.css -o ./public/output.css --watch", (err, stdout, stderr) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
