import React, { useState } from "react";
import Content from "../components/content/Content";
import Layout from "../layout/Layout";
import moment from "moment";
import PageHeader from "../components/header/PageHeader";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { Decrypt, Encrypt, _Decode } from "../utils/Hash";
import FileUpload from "./hrm/Configuration/file-upload/FileUpload";
var CryptoJS = require("crypto-js");

export function Test(props) {
  const [a, setA] = useState(false);
}

export default function Demo() {
  const [date, setDate] = useState(new Date());

  // // encoded.iv.clamp();
  // console.log("key", encoded.key.toString(CryptoJS.enc.Base64));
  // console.log("iv", encoded.iv.toString(CryptoJS.enc.Base64));
  // console.log("ct", encoded.ciphertext.toString(CryptoJS.enc.Base64));
  // console.log("ct", encoded);
  // console.log("dec", decoded.toString(CryptoJS.enc.Utf8));

  console.log(
    _Decode(
      "cd305d0a33705a1421d877f3513b2e1f8e3b943779e7f245aebc6cc44989e9c81bbefe7d7f03a99148f32b30aa69e804dd66c8cbcd942bb07d7b64525a5270ea6d9ea61a71d34b69334491b41e764620c8c4b80a4d0e7aecc5ae2f15049ddfd6789542dc6a72a701412caa4859d8706bbaec1e7cae6e0f0b278400036e0081dc7f1f88ae32230e26a46dfa37978d6bcc9c50216e930dbbde2b7d801be943205f185a749cf8911c568cf4e9f16b8095b92d81dc19a6bd4dd1769c23eb47cfc92f30a33f99fe4ae6d88aec6f3233b5fcd012d098671a30b1fe6b6855d1dffc8bbcb6006d034d37f6fc6a5e2e406f9b322db7758223f462aba10ccf4a2bd0df8e8d2891c393ccc42acfa185cff1d36fc7dc83a7e1db8cfd05feea0f916da0720e867c8f2decbbdb1a933f99d103935de5ab3ce990c4f5381c4da797bc5215421b48254871b3bbb124bd45e947a3177317cdafb60904ccd63a4412e5b0e88f983b60097acd7f2549a20aa4b6770f08e2bc2907f9205275fb0206e12428c1a8a9540bbcc6063f8b00d9a4091015da8d871af11b8854a6d20a97a3a117414e9b1fa9371f85bc458043cac39c065edd3356fa132aa29112dddf72c9caf29aa13c59e0f8a2d3d414f361b14c19c3382e336550b5bd67465a3a1a512d8c5d419664dec8c952d2e3314c4cec48f4f588a99d2e379911ceee5414a3d3d9fd75525ddf439f0d8ffc03a4d642a131ea8eaf4e8004cc4d5862fe5be827b6c56fc85de03db2c1f77427a3052c2eb007b25d9a5e4908ba777362052aadc5da0d3f4902dee2935cd2d94f1866c5ccc0a7a25c5e078bf4ab6f1dd92c34020cb081d78d99f2cc16951a918d87264ca56713db66f108cd69922bab4b379bdf70038758ff18e6ae39a2a8fd90b5e6f9c018ec6bf3df3ccdb76a9da44f6105b94799d4ed2b265d8c3994fca81911c30da4e26c50b9c1b674d33e1ecfeed6af0d978ce63bd60380eb43b667abf6451884495b2a16790ede4ea1758910a8a12725f607617951bd471035a07e315c4228ae78b2e5d4500a72332047c296e7de2655eccf4151c8fb36117a391c28ab3c4879c0507488a3847ac7b333eafe6ec49ebfe2050f9662bcf19a36feb6845d92e8f34410e22d8b0d4ca8e56aa7b8d40926483b7dce33486f5872dbed4e554f574f50220a44f9aa5422488b1bd8a5135a82941442865fbe7f2dcf28122f5638d7da6087e27167e260f7ccc8344e3da9bdacdf69118167353b21cab90e35cdde7c70946fe5da5d5bad18d25739e49914101500c72343cd00756a8eb3aa081a807b3734d1338370569448bf265918f69c806aab6de49fb987ed95f657ab7e1d4aabd23700e64ab904a52891203660382f7bd7ebca996150c3b02d1a4ac4031e1111c4709954a2ecc46ec30d78b07d431de9f860a295edfa7c85421e8f56ef861a432c56448bed98ea5ce30e09e9e42f267a4a8fb01097a14dc06de837348d556ba9310848f4cf7ab758d78cb6528340f624e447ff8e6981357418f2e73dfcf78511e39757950beb4da2a8abbaa05ea5acabaec75d1b7a9ed650b4bb3312d35e2a83c20718bc5164aed14f9b8f10d3fc99fae3e35c882d2880c4f49b095651ceea3971acab44affab20900e56dcaebc580664baa4292f5f2d7823822cb9d3820fd28530b594c5a864aa189960b17595369a9e91eae2d355aa5e9f8c219efe0098616e913c2409ea54b7fb134f99646e88576238e4506e81288c32eaa4b1440d6b5d79d1a431def854079ebc93a4d2a1329510929ded491befca36ee958a994cdd0d3f23be6cca66e87da100f51a6881f1e77356c2c15491df2e9e28faaf3058f6dfaa83d7945d9aa0229d790f6786407494f8a1ce1c7cbfdb5583c1802fd793964683edfdbda1320272c45bf6a84e3fa3f02cfce114278980c29f2f0f4a43d5de0cea233baf2910bcfb2e37556485a2492a50b16f3d2d46db80f9358af935a01bd30a6acfd3019960dad5f0c34833fc972099415534a9517d1e7b7a5b784168c9fae98165c65beb49f259dcd83c2515bfffd15aa8b33733929b363e27d49b735ebf576252cde450b4bff5181621d60333db4569e91275d3ae63bd20024bfce80ce2864dde8432d35d4d5765c7d96d8ae303de5e181a545d29e4237679580a5300bf2aeeda215bc97024fd6e870d24fd48f9110e16548f910303a454ecb06e8738be6d02b79bf313e6f16f65814d547abca238fbf8b4c432bb5abfc1ebba8ee83b22db91d54401df9131dd2be45c10f480abb3bf108c1667aa74eb56f969350d493a2de0e2d3189df947fa73fd1b0dcc1e24ef8a8db633a87633d11c6eafa0fee28b0590557688f8581bb7bb08ac8a0a14ca2343d27b291819c5825df9a5329b00dbe430798bd60a853823565d07d3ea0a8e7c051ccac7a8e809ede42f0af85b139cda735d3dc434d93adef261003484a76eed8c120719e81ff999b249319d662af40d8e81e7ae9770e365cd73c8d505471eb8612b49dd32884ba136811dbf78986ce4fa00347655325784f4acaaaf7465c5bf20aee82d0337178bb509c5927ace5209c30c343187eed09828f2c6e76da52ca8d408d87320f6a0e97df492873c42560349aca1516819c6ef42c9c53ffd0844de90989864bc386c6e1fca8782c6587fb91d88d95d6cd8bf35da84330cbe75bc71c4b08a597cee9898f4dcaf3df6c7196521fabec340e3399d8d2a9b563e09a75fd10f68f6cee1e47053594da8f90211eb05feeb4ced3e06167fa26e173ebbba7fbf25ae27f14589ea9c8df69ed298105cf316ee6bb6cf9cbfc78d0df5ec8985d1155865002cf2b9add63bfb589996e13546609f868e0aaf6d8943952aac36391481ee904cbb1f9794361db01231fd0a65c53ea4d4ea1d1e91aee0c4faafbe7cd8801ee969fbb43140f8b086c206fe9902b5677ac80864513844e934d75a470494123793cb559a1246ed0e8a4b28d4e35e56d758debc85fb5e93125b2957254df3c4e89f66ea6b6f94b071642c18b1bcd35535d0b76311b5304b1e3ddfef0c19be58e67e3825a6279df3f49d4ecdb058df42a475e6f634db464e5822415a8aaa15f6b0cac6e9ecc723730d16bffce00a424d2f42366fbd063c77ae52c2af4afc25fb7d65f1ac7329f51a5a36d1c7efa166bd36d87d6ffa10e45b5b30ae0c26d06b0a36358388f43111459b608653237cceda0c84adddec6a362d82bc45dbfb5345ddc11f0a351479234b31138112c30b43cc33b221f5b4c460e8561a6b6c470480165716b972050dd550ede980c52fc4f7d6f781a26e193fd796b4636fc28114c1df0d66ddf2893a25c4b6d174532b839fa1c5057a5a10a1c0ded0030bb131b1fc1f2ed20e901a352e60aaad7f7df11a0a60be407a81f3b2f6f74cd22afbbe446c0300909ce747f3767d82ad5d38c9184b55c94bf23c8cfc126f598cb49f03c0c02cce4dce69623601480f620cee71506fbf3110bd28ca13c7faf943660e2ada68d628105a5ca5567186cff528f6547a05ec4b409077224aad7cc7baa93cd872ae282dc94783102253f9ea348ea7d1cba506ed89731da99af11b02df5e679b8cc6547c8f19553fec5ba4b027569a4f2f26544fd1fb9404ec6b1120bec5542d5b4028ca34f946fc807232177cc080fca1225408bebdf88d7401b2e60559e72bcb92a468aa873e19244a87fdd99fcbe751b0fa3f36cb02c99c781f7d4270fabe82010dcb432ea173a08b3f4e3d697f426aaa6bbdf36a06c9e296b6ce8c5d923d15f0d856898633abc1668d9c145e81911784d552d7341a83791f0c63a5ff458da558503b818456ccbe47a0ff2fa86436a0a171ad077a6dc22292c37339cbfc4efdcb63d86a8c017581740e749298ab97f03ee334dccbcb2fc69a7eb114556074666541d6c7da7c7abd99fa4da08e5dd91cf3baf3e1c2a2d135823fc049ec2d9b526ab6f1b2f3190c4c5f7feba0fc363554ade7ebf03c65791f7405fe113af1772991175a1fccc6c24a292978f164d54ed1397ae1ef335146244d860142749e1d60602fb85e30d4617c8758caf4117535b8f74ce5f62c755e358e37c50f99a5e4fead7d47ceae047814a978e5ad299ae5f317fe36498b371dc285657ab22238bbd6d41f7fba81b7f754aeab155b769a4a74aafccfbcf3a4fa3efdf13732e4d0544b2d4e1f42e97ca4564876ad300ca1a7a357afdc3514011a6fad16358b09bf6a96a05ce4e85ee4f2783ca7c2f98458bed50d3c4e1b85ae9e03232008b4c5b30ed2e42b6058b0dd6384dc4bee424e3f0228923a2fd5bf6a2ba63f6874d26e6ad802569c40b73b97890bee11ea0808b77337eea1f4e15a32140b89b12c2c532765f850763a7033861983f93d7bb4ace7653e05c48afae656f4bcc0dcfbe42ef3738f034f4fcd05669926da27f22420eeadb6d56ed318e2fbb3bddaadc2dbdf3873c5f25d7c3c0765ee430f435123373744b956237cae8d68cca6704841947639b30db409dff09ac504be23d1c958599b751a464c6d9c85ca3a30a216674283891684ad59d02f0d2847b149bc7813776c1cbefe677d99d8f13c7b94a11e2e0d6ef00090c99608c9620af34022961c7c4774e655721f3edf507a6e3bb38bd0bc0107f3a309bea65a1bfdf0d6fb2d6bf25fe86e0c2681e8099705dbdfb92b40629335497ee289089de22566cc307987424e5f68a51af3649d2720d15fb615e55a9a7808b9fd8cf1db740aac19a946498e915aebe44cbc3f1c2ece7feecdd40ff115cb0f1a02148657a5df15e9a3e4f2f678ff7edcb46c98da94d2497b4f70ab87f66061736c90af4a54cefb78aae2d17a9092fdf919e000c7a5e6cecd705724684bf05afcf1f6544350ef45c66caafeaaf13ed0ca61febb8c9a370c860b1c361af1de52eebf1e8525e8d50b053f42f774e89275451fa2aafabad25b4db919e9c63e9da9150247f0f9954c33e5d868bc280c89b06443e20c82ce1b4963ac500176f67aecb7617b91d31264c32d3b84a441ee7f7bbdf65555f301797b041b19d7e4ce7e697436222c2c50f8e7980b50f8abba4652788e62d73ba40560e5c9a79c8146082fce481bec11c1204c8f6a817f109466e70f6de5ac2dab53dd18d1538a39668a32b963e707a607eec4d6ca9bd9487f990ba86e4dd802b89a4da4722372a38a158f676b21a18b6d3444d32542be11ff15eac4bd333efa3e5815ac4787fc98d944dc1661e6e29ac38136339c6d019375463daa51424e3c254958f92b654fde33860f52dbd51475bac41782ff04ec59b64d7d421b12d1b14032361db389b6ccde0e084903b26b6f577b62fbda8c3a1a84d0c5745a8d2fd4f3bd70180f5395c863fae8942fa9331287c0796d001852545fa208ae269be58686081b4a2d4f5b2f438a8237848ef30b280c028bb16ca5d4a727dd0aa3a0e3ef980b3df4fd0352123cb95bf839c56f597c62764a05ae1958d0d31978b25061e1fdd9b9e21d7bf40a38982cfdd6bbadfebcf11cf9765306ea122431d2c67835ad75f09e00d1876dc58e11a36df53677e0d58d737aa22f24954c39a9e352cd39eb27749e2f8725fd2bfd6178c03af1883b39d5a85e2f21f0d3841fc65fc53a579d2e9e3b478f72e6feb1cf118045b6fcbd0741e4779f81938d7d19cf6d8d0b6050fb2bc7de6c88f08a0f6718e95d7bb7b07e04975504ac6e6aa08e220a543dc61acc127f839b4584c8ac3f2d812ac13ff864bbe65308d8b63aeb7598b6c77da1cb00849ffaae591016e25793cbf271f34024a2da255a30545072c748c38ce37db45609046d2a4851353282993bfdfbe66ffc21a099248eb94a92853e231afd814e8d42d544178f2cbd14e2ee960452df96c45174d194c2496f1ed431991d541cc12e62ca6856126ec9d16f24d84f13e142c90997460203146a5"
    )
  );

  return (
    <>
      <Layout>
        <PageHeader />
        <Content></Content>
      </Layout>
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import ReactSelect from "react-select";
// import { error_alert } from "../../../components/alert/Alert";
// import Content from "../../../components/content/Content";
// import ExcelPdfPrint from "../../../components/excel-pdf-print/ExcelPdfPrint";
// import PageHeader from "../../../components/header/PageHeader";
// import Loader from "../../../components/loader/Loader";
// import Table from "../../../components/table/Table";
// import useFetch from "../../../hooks/useFetch";
// import Layout from "../../../layout/Layout";
// import { SBU_ASSESTMENT_REPORT_GET, SUPERVISOR_BY_SBU } from "../../../utils/API_ROUTES";
// import { API } from "../../../utils/axios/axiosConfig";
// import { YEAR_RANGE } from "../../../utils/CONSTANT";
// import { USER_INFO } from "../../../utils/session/token";
// import { SBU_ASSESTMENT_REPORT_EXCEL_COLUMN } from "../excel-columns";
// import { SBU_ASSESTMENT_REPORT_TABLE_COLUMN } from "../table-columns";

// export default function SbuAssestmentData() {
//   const user = USER_INFO();
//   const [loading, setLoading] = useState(false);
//   const [year, setYear] = useState("");
//   const [data, setData] = useState([]);
//   const [supervisorList, setSupervisor_list] = useState([]);
//   const [selected_supervisor, setSelected_supervisor] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (year === "") {
//       error_alert("Please select year");
//     } else {
//       setData([]); //for safe
//       setLoading(true);
//       const payload = {
//         year: year,
//         supervisor: selected_supervisor,
//       };
//       API.post(SBU_ASSESTMENT_REPORT_GET, payload)
//         .then((res) => {
//           if (res.data.statuscode === 200) {
//             setData(res?.data?.data);
//             if (res.data.data.length === 0) {
//               error_alert("No data found");
//               setData([]);
//             }
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     API.get(SUPERVISOR_BY_SBU)
//       .then((res) => {
//         setSupervisor_list(res.data?.data?.map((v, i) => ({ label: v.name, value: v.id })));
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <Layout>
//       {loading && <Loader />}
//       <PageHeader title={"SBU Assestment Report"} />
//       <Content>
//         <Form className="m-auto w-50 mb-3" onSubmit={handleSubmit}>
//           <Form.Group className="mb-4">
//             <Form.Label className="mb-0">Select Year</Form.Label>
//             <ReactSelect
//               options={YEAR_RANGE}
//               onChange={(e) => {
//                 setYear(e.value);
//               }}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label className="mb-0">Select Supervisor</Form.Label>
//             <ReactSelect
//               options={supervisorList}
//               onChange={(e) => {
//                 setSelected_supervisor(e.value);
//               }}
//             />
//           </Form.Group>
//           <Button type="submit">Search</Button>
//         </Form>
//         {data.length > 0 && (
//           <>
//             <hr />
//             <div className="text-end">
//               <ExcelPdfPrint
//                 exportPdf={false}
//                 print={false}
//                 header="SBU Assestment Report"
//                 data={data}
//                 columns={SBU_ASSESTMENT_REPORT_EXCEL_COLUMN}
//               />
//             </div>
//             <Table dense columns={SBU_ASSESTMENT_REPORT_TABLE_COLUMN} data={data} />
//           </>
//         )}
//       </Content>
//     </Layout>
//   );
// }
