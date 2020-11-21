import io from "./socketIo";
import Echo from "laravel-echo";

/**
 * let Echos = new laravelEcho({
 *  host: "http://xxxx"
 *  path: "/ws/socket.io"
 *  namespace: "",
 * });
 *
 *
 * Echos.channel("****").listen(".*****", e => {
 *    console.log(e);
 * });
 */
export function laravelEcho(options) {
  return new Echo({ client: io, broadcaster: "socket.io", ...options });
}
