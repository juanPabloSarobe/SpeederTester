import { Button, View } from "react-native";
//"rol=usuarioNormal; sesion=bcb0272a5e7e87c9a395076a729835c6; usuario=jp.sarobe%40gmail.com"
let cookiesArray = "";
let cookies = "";
function TestProxy() {
  const consulta = async () => {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Cookie", cookiesArray);
      myHeaders.append("Content-Type", "application/json");
      console.log(myHeaders);
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include",
      };

      const response = await fetch(
        "http://fullcontroldedicado.ddns.net/servicio/equipos.php/lite/",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("La solicitud no pudo ser completada");
      }

      const result = await response.json();
      console.log(result.GPS);
      const resp = result.GPS;
      const empresas = Object.keys(result.GPS);

      const resp2 = Object.entries(resp);
      resp2.forEach((element) => {
        element.forEach((e) => {
          console.log(e);
        });
        //console.log(element);
      });
      /*   for (let i in result.GPS) {
        console.log(i);
        console.log(resp.i);
      } */
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const loguearse = () => {
    const user1 = "jp.sarobe@gmail.com";
    const pass1 = "juan7595";
    const user2 = "logistica@globalfresh.com.ar";
    const pass2 = "ANDRES";
    console.log("intentando Login");
    fetch(
      "http://fullcontroldedicado.ddns.net/servicio/login2.php/login?usuario=" +
        user2 +
        "&clave=" +
        pass2
    )
      .then((response) => {
        cookies = response.headers.get("set-cookie");
        cookiesArray = cookies.replaceAll(",", ";");
        console.log(cookiesArray);
      })

      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <View>
        <Button onPress={loguearse} title="Loguearse" />
        <Button onPress={consulta} title="consulta" />
      </View>
    </>
  );
}

export default TestProxy;
