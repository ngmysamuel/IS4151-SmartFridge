// sensor raspi gateway
// >>

// objdet raspi gateway
// const objdet_raspi_host = `0.0.0.0`
const objdet_raspi_host = `192.168.1.61`
const objdet_raspi_api = `55590/objdet_raspi/api`

// sensor_raspi gateway
const sensor_raspi_host = `0.0.0.0`
const sensor_raspi_api = `5000/sensor_raspi/api`

const HTTPconfig = {
  // the client tells server data-type json is actually sent.
  HTTP_HEADER: {
    "Content-Type": "application/json",
  },
  UPLOAD_FILE: {
    "Content-Type": "multipart/form-data",
  },
  objdet_gateway: `http://${objdet_raspi_host}:${objdet_raspi_api}/`,
  sensor_gateway: `http://${sensor_raspi_host}:${sensor_raspi_api}/`,
}

export default HTTPconfig
