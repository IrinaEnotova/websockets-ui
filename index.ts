import LogStatus from "./src/enums/log.enum";
import { httpServer } from "./src/http_server/index";
import getColorizedLog from "./src/utils/getColorizedLog";
import "./src/ws_server/index";

const HTTP_PORT = process.env.HTTP_PORT || 8181;

getColorizedLog(`Start static http server on the ${HTTP_PORT} port!`, LogStatus.Info);
httpServer.listen(HTTP_PORT);
