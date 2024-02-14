import LogStatus from "../enums/log.enum";

export default function getColorizedLog(text: string, status: string) {
  switch (status) {
    case LogStatus.Error:
      console.log("\x1b[31m%s\x1b[0m", text);
      break;
    case LogStatus.Warn:
      console.log("\x1b[33m%s\x1b[0m", text);
      break;
    case LogStatus.Info:
      console.log("\x1b[34m%s\x1b[0m", text);
      break;
    case LogStatus.Success:
      console.log("\x1b[32m%s\x1b[0m", text);
      break;
  }
}
