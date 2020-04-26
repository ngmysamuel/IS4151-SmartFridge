// sensor raspi gateway
// >>

// objdet raspi gateway
// const objdet_raspi_host = `0.0.0.0`
const objdet_raspi_host = `192.168.1.61`
const objdet_raspi_api = `55590/objdet_raspi/api`

const HTTPconfig = {
  // the client tells server data-type json is actually sent.
  HTTP_HEADER: {
    "Content-Type": "application/json",
  },
  UPLOAD_FILE: {
    "Content-Type": "multipart/form-data",
  },
  gateway: `http://${objdet_raspi_host}:${objdet_raspi_api}/`,
}

export default HTTPconfig
