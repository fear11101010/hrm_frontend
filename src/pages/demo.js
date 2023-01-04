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

export default function Demo() {
  const [date, setDate] = useState(new Date());

  // let txt = "safa bin salam";
  // // var key = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);
  // // const iv = CryptoJS.lib.WordArray.random(32);

  // var JsonFormatter = {
  //   stringify: function (cipherParams) {
  //     // create json object with ciphertext
  //     var jsonObj = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
  //     // optionally add iv or salt
  //     if (cipherParams.iv) {
  //       jsonObj.iv = cipherParams.iv.toString();
  //     }
  //     if (cipherParams.salt) {
  //       jsonObj.s = cipherParams.salt.toString();
  //     }
  //     // stringify json object
  //     return JSON.stringify(jsonObj);
  //   },
  //   parse: function (jsonStr) {
  //     // parse json string
  //     var jsonObj = JSON.parse(jsonStr);
  //     // extract ciphertext from json object, and create cipher params object
  //     var cipherParams = CryptoJS.lib.CipherParams.create({
  //       ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct),
  //     });
  //     // optionally extract iv or salt
  //     if (jsonObj.iv) {
  //       cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
  //     }
  //     if (jsonObj.s) {
  //       cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
  //     }
  //     return cipherParams;
  //   },
  // };

  // let encoded = CryptoJS.AES.encrypt(txt, "hrmaapp123456789", {
  //   mode: CryptoJS.mode.CFB,
  //   format: JsonFormatter,
  // });

  // let decoded = CryptoJS.AES.decrypt(encoded, "hrmaapp123456789", {
  //   mode: CryptoJS.mode.CFB,
  // });

  // // encoded.iv.clamp();
  // console.log("key", encoded.key.toString(CryptoJS.enc.Base64));
  // console.log("iv", encoded.iv.toString(CryptoJS.enc.Base64));
  // console.log("ct", encoded.ciphertext.toString(CryptoJS.enc.Base64));
  // console.log("ct", encoded);
  // console.log("dec", decoded.toString(CryptoJS.enc.Utf8));
  let a = "d54213f52c18f68c3b5871aee5716bff881a7413b5d850602c79d230aa8ff21218c3f52356e06466793d25b5eee48de82ed78091f0db322954fd8dbf398c6bf514eaf650d8fa42817dafe9a92a1be0635eae8aeaff5700b52878cd608c97b3af5b5df847d8c304e9151b3bca3af5269261369b668d7a150f0c46b01ab60133a6dedacadc8fbc0fa9394da3a2f4e560868c6e6ceb5e29d8d79748673bef476a13b5f687dfefd82087bec5c78895a4595ec06541812fbceffdf3e69cf31470f2f452f5b8cac08ca2e5c11aef55d6630176e0cfb8456ed6b2b5b1413777f76b196a15dffe443d4037ed1f57f5460eee97183e0eef12f390c07d7d0ee8773de24f7cdd04acbcb8818895b23f293a5c04abc591c701ba03cb7f2e2229417d1a30265d793781e03128425fc04e9301f7953dc1e396d8f265c4de49a3521dee9f6d7d6d723070e3894b9857ae1a42a1ec289dad46247476b11e7f006f5e1ca9f1589a82e207a6fcc7aa407de484cf1fc34afbe9582cd965d555c7350fce93ac45488886a220f0de3ed8905cacae9b2c7813ee58d3d3dc0abdf3a7cd9fefeb96a39fb03569c1f25becfc1bf5c3dba1b6117e229e3df29b84fb37f77cfa4bc64a83473034c7c50a94fb740a8488588a987b7077a8c7699e9699fd541eae63d800f4d83dd07cafcacfb73f566307d3ae219743f78a1578d52acc49dffcd4e97c757a3adc40e8c81e966432bd154da5290ef53d3b7f4eac2efb7ecaa60554f1836065dfdb10a8ffe714799e4a540589f546f9030e795e7dbbd17ffb1b4fda2a6a5f3bda3b1a49ec656169431a1acd60a05c910ead1212f6872e38bbaac39a653896d8e9b36969475210eb76b228f8c3eb2834c2e7b89f719569b2d2cf0110fe257c931eb0d8e5a14ca1f154195b30b79de41eae03a672e01574ecdd36c37e3c60d05dd7007882e6ef814a12b4e67b854ef59e480138d210fb5d7f1c64567cbf608ab4a5f08a5f3f8af0a4af566b1c1c6739f7d4ce37cfdf66783f3bf0daac8fffb9ce57f02b212affe1dc1d308f728c71e399074a032c89048acd1e965954a39bcadb5bbde36c93efddc396a5c7b684ad0b8084cc917c459a7396f88595fb9f77bab74b5183e4d935a8a8642ad842cac2fc4ed32428681bb78af4ff35402d589044531b7af4fbedaded7f58cb267b5b18a134840df3eb769a910d97bd831b49f95b009d3500b676b89c03b4655d741bc0e3b66339ad2b6d3b0559a0f90ab62fe65367ac1dc4429141f55fa18f0071981c6b4cf9a3824414920c278b4c458b2cdfb3864942156848e2ed2e6804133fde702dfb883e2e5ced8802237a46e324a226e066004bf9bf77b792132820c5a03f2d15c4bbaa2c66b6923c89c8b1fb7bb572a2ce4c9b20e8192178f62ba1442462879b4a932d55b62ed839fe3ff620387a1eeadd1022d742fc1ef00cefee2a5af173764943a415a429e64a5df5c0ca69b4f84c2864cb642aed95fc09cd6049b67d1b3544d8ea5c8abe0ca4cd738bc4d9d56227c2c2f2baa2a83d54e21c5dd652deec4e5cea4cc70b9afd468d3ae31a581ee4c5311e2ebee87d946289ce70e4deaa8166284ceb6ce41ee53c51b5e199cd1ce8f4d4d129fdc6ee9935bb567275e9abb32574971dbb2d0b15a6e8912221114bec2ad5c43d885adea4167a445f0c6fd80c0b39e715fc466417845d9fc12cb3e65f3b2a25a0fdba22c3aa58de8d89987516d5d699cd24c3ea8d9d0e4f526514ec5deeacb32a083b0e86add5741a6e4d58a9ee3b72d23e547f823ca57150fad26525ceaba4bb2689e0bf76c9c8f2d6144a16c7d43fa984349a90fe7bb7282a24cf34e9bdbe8d40bff2522338de3ec7625a8b9025fd5b7885f2c4702917c9c87eb3cf8aae4b75511c7637b404f528f748a8449090be6605b6e3ddb0ed1cbeefc5cdca94a8e4edbf3a56a7a994ddf1516f1ccc53c9424856f10ad778795831e7f7fcbcb11c3740ce13939ee793091d7ccb2155d7da6bd104f1d91b32d243172e516bf65cf5461dbf4b2bd4f011c26506aec19f9b570ab3a1db1185cb36df45527e257c21d5c3e6b175e52c20303a6b21e99b449468ad6299bc814ebe079897455b48b17da6152f7079ab2dc7900b32e20ba1eb495b2bb241e2ddb8dc0a379ec202494dd3732b7435ed05183cb4aff742a206d1ae2dd25fe68f5b1f5cf1edc170f7f765d358ea3c092e66914d8053903180d9a8a2cb1f6b55aeb6bc8ce1948fe98f04b18e75f9203c747c3674c4e52a244031bd135799446a54eb3e69f458568a9f1ee4e33ca4c4598b98cfa26207173c66897e49016c2c2070342ac7bb3f3a80fb125408d38c73caa4821a77de7f3d71aa7877b1600c36e75bca422c8a57d8f5b8e2f350d1bb08ad9d47f297d0729f4454385d5bd26e3f9b58cbeec38563d568236d1cdf3b1558c6b5002e5bd306195829b9f448060600d4f1bad26152f4aba8fa7d221d193fc08aaba3f34e6fa6a64bb5066769b8ce7d9de499c53dc18484fe20738c6c89d4c2ae1a9abba7ad76a6fd5454ba66aec158958af8c061a6f99ec93020ed79045bde531bf1543f84fcd2cf6a0d7b1fefe4c735eefa3aa57e9e6958437aa4d34645bf6bdd75b639603dea2900febc512380b58ef08fb2fcc553a6fc5e10d49d6d3134773d3e8616a85cdd085982b765e8e9613683c1919a9dac497c06e7493bdce0d7a0b614f312e826e945a053ff96a2aec4541f8b1b0c4e846486d5c167a17f83c84352b8f83e45561e1b072e96f3c3b84ad6010e6d79e54951146367eaaadb63870c071bbcca6a2e1e01700f0a8932b5b04b2074c2af499f63df4e86b0d14f860f2f9317eb32577f1b1bd87d836574bf50a43daa68e3503791c51fb4da7b725aa69b82dab9075e53c4545c5f78cd0f24d034aa2eef17216df625b17b1b06655cecc7f35126512d851cc2608a2c7d613f2dd51532994ceeb334bda0eaf9d65b6076deec41f651f8e70ade17ead6d02a5b71f47716c4e9ae0eea750d2c2b1fa93a81aadcab8173373eeeb6a192d64123e43e3f5ed63fe551c41d476cbb073e749a21b8eb748d13247625e193e8fc06d3e80450bb4c45c58d44ffdeda8b30022dd1e96a32539a07da938887da369648f30fa607eaa36ca54f196814142a183fdb6680a7002fcf4013dc112ba3495831641ce343c050f70c36b713c6f5f02ca802f31fc047bbb08c3f2b3b558388f7ee54c52a261e2510171a7258f8c6cd05dd37f0e77a8f3b1ed734863a9ab66767dafd33853e2e7653e35b4ef2805f8914d01e0954b0ab9c48ce05aaabd60a50695bdc30f01a2f7e31fe4a72ebac83f6f7a9ecdb66b4db7e3869813e6d849d97f4f77bea0d88f39b6ab1df7263cb3558acd3b5bac9d22cbe963b350dddfccc4b663f889e1c060ce685ba36aacc1157fa0e15f856c39caaae8c768e24ea2286d2940381a3d791950e5e10c961ec81cff4bd9e14729dc72ab88fa178dd487c72e71e8a2ba3840d89413db16727ea6096b0c2fcc1f6fa1bdd1b5ab4e59b1292117143cef312e317c129dda93e84f3d0d9ded741d42a8c4c72dedf205f4e3d43ce5fe8323e68e7c2c8468f3c173e991cb3909c27b810bf39fdfca5249232e9a9d08df52988ff7126440181bd069a9147b9ffb00da7c241370d387e248689ba953ed259d281b6a9d855074b57b6115e99fd8e58d2cf37ffafd12526c6fdebaea5c3e6047b8d6559e0fcb3ae118fe900d4e133e2cece20365b1f874e89c070a8cad845adea4d11768a5d4769270039695088ab687940c0bb8045f16b4dd35fc0b2dd7c1d4166d417633a4e96d6a47e3c29ae50a59d5a4cc3ca2cb435a8c50cbc560e8d04d8fc06c529998be4e8c9f589cafb62f9766922103b4be47a02da4b3097bb5710d9b2c0b6cd0f6ea0b293bd0a4ccab6c534f59b37147474f3155f27d2e92a754a857e7787d0f6944c8af1245950c671ad05c130fef8bfcc32e01da5f6b8396374bd4cba16765268b2f02ec5266f8c9813cddc37f39fa03a9ab0e7299f99c6a7bd5d4a005a35c754263044678482ca31fca96546663821ed9656dca862ce0506f0f917b1475709244e8ad23e9dbc3b14799ec77e13887063d646c5d82bbe065296dd456b17a1861658c35b5410628dc59b218b0d3dc122977939a36a5f34faca28f6daa35e6e16c5021f22c6b21c54d3e71d729c5663c70eb682d138ff1f670e7a7c89c66861a7923a4c3c6555a87afaa5ff1ac08e91227fa683fcc83ece1bee03b7e69d0008b2c1b178ef69c5bac87cee13f92b4985cb6f224170d1ebc72e4b4e0338e5a43109a98af5a56d034ec9ac254775318f5bd30adb4711aa7f3d334de18a957b1c19848d8aefd9137071a8bca34c792dadf53eac18f33038a7ad0cb5a04656ee227535d6045d6929d2c19c33dad0aff88533837ce992c808de9ff311ec014e7a68f25e767ce16c99c3895bf6c897d51206d357beb366e4e83c7a730a3ba3cbedae0b7ed8fdb004dd1c6fe1b4b010e561cbf88f2d9e516b669bcbb16ba310c1e3c81829474b19300af85df805fb1458f8e30c0ff352d5e5171aa3d9203aa21ee2dcecf68b939e75e056a8e4fbe0d87f13e1114b02e44a3e756a1852da58f7f8da659adad43b9d700ef13783e16c17151c7cbdb8744a12d9cb9a396f098687de2f980cbfd2132b1bb6bd15f7f1a608d39743c143142ed954bae2a7b026a6352d516adafdeb6ab2ee4308eeb6b85cfe7d56c5e79d3f63e3b651c5fc1f0c4a270092fe5de90153b86cc9a7ee2405ad36ced1edeeaf27aae494ee7e5b857d72b2aa47d68f2d142c31a5f9c97f1fac53c7398f14b1826fd7a161200a549c82d0bd75c9a3759cb0577524dec9186461b64f377352630bd4f2c29ad7f9364ced420df0a1afd311a6cc330cc48a37b5e53c040f4882f277702c8e88e0d15284d1ad19b392ffccf8943f528279e8d053e799e2550ae2e3056bc6749fdaed8e73436d9fa811111d7b867d267dd7d1ab86e327304deb011c2ff6165778b283829e277cecc57f84af3e1ea581a2e1bf65a0e9410d1e728b0499de7bfaa72f719a6d9e148ba5951f7b1640f86b205d909f67c6333db5e2e550694cb3fb3d7417694513fe645359d74509a38d36b9ed46a550f382dc2abcdf4ad046dd025ba15ebae038664ed9d2620de330615e5ba5628b3afa670408e06d337212f62596141017180a9a58818fe8a6dd2cc027e14ed46c70b3177ee47065a85af136f9c5dc5a6b52fcf1dd8998dc9d7def166ab0ff8d6373c0c388862752f3c54b027a2a78ca6b2ab7e094dd31826ed2772f00b422da5469b41288e6b78ebfc72ed1429c515b409372ddba0f41459af945e6d1e3c4b476210b6e1e37cfb3b528eed2831337a90423e98937212d1815d58875704801a16f8c6b2c52ea120d034f32f080e805b271f51927f4a99b83784bd7dde9066ff4fd611315316288fbc8cc9f671c7a7068825c64d3c455a5544fc02186351cff7619d638776b754a33258f2d7c087033c415c581255ecc1d36494be95df936078cb48500d64346f5ba2a5aa9377ad8f97732306d5ed261c39c2ac3b9827b96dc99b72d9becf09459655bca8ad9184c325319a4827d51478e9ee227ae1d87cd2f5453a81bfa815dfe94c1e171fb48f007a8e2c886ec2098ef6f00592b2b43d1c00679dd414682f9184a06385c0faad8e5e442ddddd1ee498ab6fabe658129c4d7a06c217a004c7d7576ebf61ff285442a94b8925174f83ce89ddc353777a147cbcbf2ea772c9b152bd2ae3de003e3ff7c7d194b69899a603cc4881a6d9a439d875268a92c5c0a9d6fb526da5db0f9e995061aa8c5e6c905393bab0a9fba818972f572f07dafb467905211ac7169a734b0a28f0c664fed5bee2a27e37cfd320f55ce6b96007c51d0465db0d29da13d0e8372354900035a947f6deada83c33e712815e000ac912ebe5d69a9f601ac017140eb42aed152505da73deb1664069c753df24faa9ff1d30d56e83da2932c784789e25ba7751e130fcb0e3817d055b4fcd7b72734fe233cf5d31f2967ca835160049a91d83d5fa67db3f2a579ff21ca93767b803f1e2ea67812795d16774b4926287f713257273c49c00d2b0719bada947d5fbb4f5de53b2b9e7c589e832aece746a28779eb5ad26a0a2b63986de70ccbbb2cafaf3c3c5aa6f6b4980ee6df874f3b4718ac62c90879a5ec51237b6ca4f5996283128d12937492df82ee4299c3b377741133d8752556b7f2c0f07ef5e1a9378a887c6084739f24c9886109a78858ab16785f105ceaf777429f58a594e8013341f66c95a65912c8d7811183c0da192ce2382bd218d2c772dd026d9a19666b0ef58c3583f4c5e0dcef5f229fa5661e5ef9307ac3764a0455fe42500fc494e2e32f7e78bcfa5975ea0d0dcac2e4131cfeec8e8d28a361b4d6dc6ad605c075495ec404c321d828698adee3c0c712243532c966b4bb213f03663e40af18fc4def806f9e00f8ce9f8aaeeebabf68d09c84ab5b371fa44e42a679ef04927523c86da72c9e5f70867a3e9c2f81e0be82e70e5e8665fc70a3d328dc946ca8b77fdf2f67b92b025a3846b088320ed55ae52d5d559082dfa8e448576c0b7411fd7905bc5b53156d59011c49c3b45abf9c9323f0988662323b53ea131b7d2a02be146387e3d62e2006e69288e55e098b0f848a4fdc35c015fab832ec20e559f5eda7c0a6aa5ec07c1fa154d61782a2cb6d91990793d3858b59f8ed78ffa339e7c6d19c49857c051d5d2b9313d567cc521da91e5628daec33d811bba00b1377b625ecb797941abf8b8593a0b820b7afd26dbed323ac1aeeb9180549e17f173b82ff2beb36dd749aa434711f581b88c5508142f4dc1dd4d054993af15507309aa7954da8abbe601073e656dae171ad536877766c4f8858aa771f191782dca8ee75b9394f7ebfe43b929a492f47011e82df3e00ca0e45127c22df5bd5efc1917aeec7029f797af28098ca8ca66c4ecb7cfedeb2708d3e2f5fd880a7779c72315162479e7eb2588f90be38f470c8ae7e0312d5322a79ac8b3011acff13548153a38eae8ba3f63dda6ebd97b28420de0e3afe99134b8391152794a60b9a3988f9967debaadcd2601a474f92d9d8392e4b45d716d34209d1801bdf4995814ee4f6aab5131a07b89a355ca99fcdda31c56a950a061cf93a3336969e8f00029a43e4fdfa731c815f444d329a7a5a7ed51c096586f18405a16b3e91856f4b5377a2df56c943d97f52bec57742a508fbd5cd45dda00dab707d3995950c889164ec86498c79264a5f5d8ba7b2221cc54ff8042831f429005afdf71339b7ecf4a7230080bf2e01d1e31731adb564fea8dd8312758b93f88b4d2ca3c2e2348aecfeffb6f916f67bea654c2be3f6759bae7a2acec72cac8b3f4e2742c63ad36d53d641819d03157273049c203022ec0495844146babd6926c5a7544b270ed5b0258e9b636185a9971353691e0d96cc189d1e71926f72f9af61e3e5ee5597097de6a510524a4ce56230e6f16732b0aaecc31db10fb4a95d71c7cf6aed069271f2785e68c692ff30ef988c32ebf952785adf60597426e8fe26b9ea94fc11eae71a6e7ee3087410e55ee8729fe1bdfdb6a3145afedd5b25f1b38c3d0ebb39cecd62484221d76fca72db49a140c475f99597c186ff9f61cb54b3afd145996dc3331a5fe27467948ea664eb0676fe3b1a55b30c28b50eb7fcbe4d097809ade8bd1ceba2c97780abd44fc8a4904287d92df79d4e892f0a132d64a5916493789e4db5f1768a607cbeb10df0838da14cd89ec718eeb0ab9528f4a99f77416a7242132a64b7fb4b98a3932325052d53a8379864d61341e67c2ca2bdf8a7964bf749ea9ce5864a8ae2d804ad7a7015e20accc31a111a8fe34da9c8addb75a2f3c2888ae6a0769764becc18a0db39f62f0ac887423df97e01e339277763121db13745a28eb66ff210619d9fb5e72e02f26c6b6fbcc8d651fc5afbd236afd85d07833932cb30dce8f0c4773474af41fc2374800d98aca7c2e92f50efeb92764c031ecfa5a07ded7c9b49bb2e66482489888349567f21d6b0e27d13a8b4566d33051e5d4dcf31369bef3959fe9dba0e3224310497d56010b0c9f16a90ffb78083d6c021fe6d4f9488b1985a25ad7f0cafafed8339c7f2b46671118a8f895402073b738977ad17776aae3b652d1d34e25668fa2c6aefb019fa976b766c15bd9a7e0dde74ce23435f3fcd4db2443f2ccf3a49473bd4960a2ecad47db0e89a301b940918f323a092e74f14c9f076518409206ce502fa5db5c36bec16646ab47aa9823a335c38ba92a7cc60f3a5b4d6a5d73237d6bb65a681bad9f43db675080f5072e5af6c1d018f419b0f730879ff68bbaf435ac6c92d7f0460d9ffa118b174279b039c3d342c53f0f33ae824e8b634c2faad53c9e65f67cc6d4abc4fe1093872806ef509ccd31ae608ee856e37d464d4a45de446176450315853236ac695699b464f0019d5051ad0fa3021383a5e324ff6e9793541ef8c3ab91a4c70a6a045136e8e3cb06e73004ba1111e49312e202f4c63efb6fee133cc20f1a3a0aac78e1eb0e41379ec65d2138535da635ebe404945b690db26c9d3bffd64150e7d886956d6948434b7872bbfdd68d88ac9078e1d432000ad616bc766fb55dcedccc6dbbf1c0ac0f2bc1ac78e8ce72b7ed607112fc3ddc317a02192a8f72e28c2136552a569c50b790d6de2f15d2d8a37623227a40453db03efd4fef7b5bf151c06d92bca7d885c1085af69ab6b8b13a1af50dd45605dcb84ccba32591e0efd924621ea54418bd58eb1092876c7cae860c8563dfe1cdbb5902878cf0d01471a474ffe6aaac27dd4eeafb528795186c814eddeecbc058e7f01888f7a6d56b73fd40cb11015223b96946eabddea6dbddbdcc747d8ba1c5ab0fb2368299214327b629dc79c7bdf49917f7dbd0ede9d193b2eda31e130bc46c44424f1f7060fbadbe17c60c7d75d7f6e65152401dca3e4cf902a9b529497d0d462666305f051500a5f0965db3852eedeff56b083df85a88e88f24f4efee3e52293f7db4d641250b9b8fd288464881533cec40ca5ead5e70c481a7c48ce2bcfa2aee56c15f67f98726e452c9777c87060120d472fe067350b5173e299c8049684c7f8f246040dbdbe94d986a6028c912cc4c59bf68ce3f557c766cc4bd78d3f9f397de48f52cb19c3638f35794f511958cb9c015b7e75908cbbbc9e99c49e1f281d168d4a1b847a2eec37214b954c83f99f9a8517b3bc1b494305c280081cc83c617a0bcfb75ddf09e309353edf19761e044eefa8d923d3af1850adf462842742b1f46b5a5d3ecd54f46acd521cd7d8823ae261127c2fc81b49120f72ee5566343e906bbb4fc763f60432634dd136adad89e03dcd696ee5e57350c870dc147682f6250ffc5a916bfbe119b6e05faceefd92fe5aba51be095b82dea935efa30bf6d5128ccc4ad989893ed8bf5a7184dee698a9cacd01a6f8c40b5afa7a889471722b59e861a5574cbdd09e139caed5d8106fab09890011cd0558520d66d336c27a02c3daf8a3b8f388e811bd9d916c3d4265a3592b5b9ac0ad9ea8880fc7a6c37ee6fe4730d2e1859a6452e91a495a3c03158b6fd5c1e45a0b575c4b5716677391677aeabb1ba1aca06c10feadc7b21d229bfe7c9c39994dfe48af3e4ec2e725341beed144ca660816b7f0addc4371b5335060da7d803990fa75341392479a3d365afe55bef294414cad64127a5d623b3b287654ec8758aad15bd58007b1817e4d7085e9eb2a372debea14b4c2b0cf8a06440ebd2970babd86cdaaf7b4eb8dd7caab743a86b1b8e5dc90b8756c152f34d1ebc6c967c0c748ff3bc1861d8949b2e28168b13e8ac6533b747f4aa47628bee05825008d80ea23896482f277b87f311728e397db24322097a1eb7fd0d9da50043df3a72a54a25505291d82ba4444336d90c07bbd590a311dafb54d96cebc4b075a9dc7fb3f19e7d63f647a209db1fdd9e49325ca0f9a79e340cdd37ebe1766e1238c898cbe22b2086269a0bc7c1fc107673c2d91b293882df477769ab5a0bb4321e8fd014902cb3bbb567b27cd7b6fbe374978bd91a06c628289441fd6c975e987662c0b1865112d6a7926f37a660b4db2929519b6124fe60c9014470419c3a37ed433bfedc1599a07ee358e2d725e8410fbff64465e3db8a9dc4a0e7fb363029012710f1c6b819a2be1eda894da90441e502fb66a3df544c5272c100739bf9942aa74060d731567f839a04c570162edf1a153fb607ab63214bc94e8884342d478f1ffb302d8972033a51c926529e92ae302e7f9f36a6e201460de093a0f1bfa00d7228536f3ed536efbca0988741fcd3197afbb8d512f1cc3bf69dbc1a2ee1a0b8e3dd85ec55278b8a3df3284be92f117a3172218d8a5907933972dfdd4a275b0d6afe1a66d8732d97feb0b9c63443b5dc89c8cae2403e42a64afb942c301fe43d08a26922a604198a0185afca125743ebee700bf6133ff0f295f1c2c7fa1ea2e393cf6eb102a8ce23ee9d4f52ee1f3ec4f072c5eb68c51465478693dc6e9f57027a10fd46b0fe99d8c72d9f1c31171a1573b147acb525a2598f0b01665bc394eb1a0a618ad2b12a77d19e881abeec51c66e62818ba957d1714226652b9c03426e4ec4b5f7c04be66d9fd22c03009cfcc60e12a58c0118f4d558ee57e59ea5167cdb921d6f48df17066213a83c91dadfc50ee3cc793e4a2ff4de642dda3ccee3be08e7441779afbd9c7457807f842d793373dcfc7516d7a3858a9c19a153670b349f6af42c5ca3d14b13a677285fbe4113fa336b53cf45961fb1f3dd0caf881a7b4c17155a4d38341c75d354b634dee0f92ffa697bf6662125cc894d49815f0c9385af3db373dfa4877ee676bb4dbeb2fb97244037d0498a66a925eeb9ee038d08f70bffbef8f5c2ad3e6ee8797614ec5773520138745b5a616e9133dc5e2947ebfe17fa58f586d64aceb321d9522d6ee13f4d936e10a07e1e231b8a8c982100a5e7e1320bd3d3b5f8ca4f2b745eb7ddc32815fb89b3ab1df078bff041dd6bf571b22e37aac6beb5cb79610b126eb51e88c69024eec18683026b629a19f1d837ed5fcf2ace978b0ae4909111905e4640d964a848a8b19b3c3c389e52712f3f1418c52d3019c89a0b07e85b31c7f58f9874448843fa3913938cc19d2dd83e8c209039f1d235208909f46c2b9fc941ab1ef8fa3ccf56a45862cca3483f54c0b7e4c36714681958401d23f42f6b379e59c93917e15d4e280633d36fa59806b31e674ea8e6e686ecf88cb61d7d5b2955b154d57ba088139f1e2bfb16ebde7aef60f26ff42d5b68d7b44ba55855b551c67a7673664d555d2dcb1ea7a49e4d9d849702af37e4d521f5c313e752671059fe7415df4386353795d4ea05bf851ab70ece015a65a945a5fd50dbf07e15b8476576e616ad1e096f7aae1190d755e94d604044215b113b01591cce43904752877372a32e5ca2fb85e0caddebc5f6fff8607a4f53b44f546a76d07489f644f11c81347461afba7d8ec7cca3b05817d946fcdc9908c669cf73c49075b5c0db7a051637eded34f312a9f1c44ae94af38b7a8d16309994eb88850f3a8ebbc6359876c4c717dafcd328702860481a5131632652949d211a563dd7b5e65691931ded05927058d69532e9e39ad8a80f4be2fe46a3b41b64c38d1bfed4b6977b892eee595174aef7cfbb1f5d26bfd132d50c7c30f75a1e17ae2c063be1bae116800e2c47946bff2fde6b7f30c31160dab79c462628aa4c39e7eef22e8dd948687e2d395fb5805b98337d192c131e78f30bcea7321237d05002e8cbd4caa0f2463159174b3787a67e52e99722cf77b4fac4d9e05db8e547cd98a64d7843137f9578c3644b90a2a85ef7a1a3c8d188b0cfee88189ad1062a0460f4d365c2383b9dfcbc3acf52dd1b625d274470fd732c353df270571cbf9748d45008761f926be837d6b074f6db001474fc219aefe89e44f982da140a3f590bd317132d986af3154";
  console.log(_Decode(a));
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
