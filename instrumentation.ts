
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // import initServerData from "@/app/api/init";
    const {default: init} = await import ('@/app/api/init');
    init();
  }
}