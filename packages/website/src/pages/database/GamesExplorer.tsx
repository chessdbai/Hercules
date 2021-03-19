import React from 'react';
import { 
  Form, Input, Button, Select,
  PageHeader, Layout, Radio, Tooltip,
  Cascader, DatePicker, InputNumber,
  Typography, TreeSelect, Switch, Space
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


import { useHistory } from "react-router-dom";

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function GamesExplorer() {
  let history = useHistory();
  history.location.toString();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const resetRating = () => {
    form.setFieldsValue({
      ratingLowerBound: null
    });
  }

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Layout>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Games Explorer"
        subTitle="Find games to learn from"
      />,

<Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="fen" label="FEN String" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      
      <Form.Item name="gameResult" label="Result" rules={[{ required: false }]}>
        <Select allowClear>
          <Option value="1-0">1-0 (White Wins)</Option>
          <Option value="0-1">0-1 (Black Wins)</Option>
          <Option value="1/2-1/2">1-0 (Draw)</Option>
          <Option value="*">* (Unknown)</Option>
        </Select>
      </Form.Item>
      <Form.Item name='ratingLowerBound' label="Rating Lower Bound">
          <InputNumber min={1000} max={3000} />
          <Typography.Link onClick={() => resetRating()}>Need Help?</Typography.Link>
      </Form.Item>
      
      <Form.Item name="eco" label="ECO" rules={[{ required: false }]}>
        <Select
          placeholder="Optionally filter by opening."
          allowClear
        >
          <Option value="A00">A00	(Uncommon Opening)</Option>
          <Option value="A01">A01	(Nimzovich-Larsen Attack)</Option>
          <Option value="A02">A02	(Bird's Opening)</Option>
          <Option value="A03">A03	(Bird's Opening)</Option>
          <Option value="A04">A04	(Reti Opening)</Option>
          <Option value="A05">A05	(Reti Opening)</Option>
          <Option value="A06">A06	(Reti Opening)</Option>
          <Option value="A07">A07	(King's Indian Attack)</Option>
          <Option value="A08">A08	(King's Indian Attack)</Option>
          <Option value="A09">A09	(Reti Opening)</Option>
          <Option value="A10">A10	(English)</Option>
          <Option value="A11">A11	(English, Caro-Kann Defensive System)</Option>
          <Option value="A12">A12	(English with b3)</Option>
          <Option value="A13">A13	(English)</Option>
          <Option value="A14">A14	(English)</Option>
          <Option value="A15">A15	(English)</Option>
          <Option value="A16">A16	(English)</Option>
          <Option value="A17">A17	(English)</Option>
          <Option value="A18">A18	(English, Mikenas-Carls)</Option>
          <Option value="A19">A19	(English, Mikenas-Carls, Sicilian Variation)</Option>
          <Option value="A20">A20	(English)</Option>
          <Option value="A21">A21	(English)</Option>
          <Option value="A22">A22	(English)</Option>
          <Option value="A23">A23	(English, Bremen System, Keres Variation)</Option>
          <Option value="A24">A24	(English, Bremen System with ...g6)</Option>
          <Option value="A25">A25	(English)</Option>
          <Option value="A26">A26	(English)</Option>
          <Option value="A27">A27	(English, Three Knights System)</Option>
          <Option value="A28">A28	(English)</Option>
          <Option value="A29">A29	(English, Four Knights, Kingside Fianchetto)</Option>
          <Option value="A30">A30	(English, Symmetrical)</Option>
          <Option value="A31">A31	(English, Symmetrical, Benoni Formation)</Option>
          <Option value="A32">A32	(English, Symmetrical Variation)</Option>
          <Option value="A33">A33	(English, Symmetrical)</Option>
          <Option value="A34">A34	(English, Symmetrical)</Option>
          <Option value="A35">A35	(English, Symmetrical)</Option>
          <Option value="A36">A36	(English)</Option>
          <Option value="A37">A37	(English, Symmetrical)</Option>
          <Option value="A38">A38	(English, Symmetrical)</Option>
          <Option value="A39">A39	(English, Symmetrical, Main line with d4)</Option>
          <Option value="A40">A40	(Queen's Pawn Game)</Option>
          <Option value="A41">A41	(Queen's Pawn Game (with ...d6))</Option>
          <Option value="A42">A42	(Modern Defense, Averbakh System)</Option>
          <Option value="A43">A43	(Old Benoni)</Option>
          <Option value="A44">A44	(Old Benoni Defense)</Option>
          <Option value="A45">A45	(Queen's Pawn Game)</Option>
          <Option value="A46">A46	(Queen's Pawn Game)</Option>
          <Option value="A47">A47	(Queen's Indian)</Option>
          <Option value="A48">A48	(King's Indian)</Option>
          <Option value="A49">A49	(King's Indian, Fianchetto without c4)</Option>
          <Option value="A50">A50	(Queen's Pawn Game)</Option>
          <Option value="A51">A51	(Budapest Gambit)</Option>
          <Option value="A52">A52	(Budapest Gambit)</Option>
          <Option value="A53">A53	(Old Indian)</Option>
          <Option value="A54">A54	(Old Indian, Ukrainian Variation, 4.Nf3)</Option>
          <Option value="A55">A55	(Old Indian, Main line)</Option>
          <Option value="A56">A56	(Benoni Defense)</Option>
          <Option value="A57">A57	(Benko Gambit)</Option>
          <Option value="A58">A58	(Benko Gambit)</Option>
          <Option value="A59">A59	(Benko Gambit)</Option>
          <Option value="A60">A60	(Benoni Defense)</Option>
          <Option value="A61">A61	(Benoni)</Option>
          <Option value="A62">A62	(Benoni, Fianchetto Variation)</Option>
          <Option value="A63">A63	(Benoni, Fianchetto, 9...Nbd7)</Option>
          <Option value="A64">A64	(Benoni, Fianchetto, 11...Re8)</Option>
          <Option value="A65">A65	(Benoni, 6.e4)</Option>
          <Option value="A66">A66	(Benoni)</Option>
          <Option value="A67">A67	(Benoni, Taimanov Variation)</Option>
          <Option value="A68">A68	(Benoni, Four Pawns Attack)</Option>
          <Option value="A69">A69	(Benoni, Four Pawns Attack, Main line)</Option>
          <Option value="A70">A70	(Benoni, Classical with 7.Nf3)</Option>
          <Option value="A71">A71	(Benoni, Classical, 8.Bg5)</Option>
          <Option value="A72">A72	(Benoni, Classical without 9.O-O)</Option>
          <Option value="A73">A73	(Benoni, Classical, 9.O-O)</Option>
          <Option value="A74">A74	(Benoni, Classical, 9...a6, 10.a4)</Option>
          <Option value="A75">A75	(Benoni, Classical with ...a6 and 10...Bg4)</Option>
          <Option value="A76">A76	(Benoni, Classical, 9...Re8)</Option>
          <Option value="A77">A77	(Benoni, Classical, 9...Re8, 10.Nd2)</Option>
          <Option value="A78">A78	(Benoni, Classical with ...Re8 and ...Na6)</Option>
          <Option value="A79">A79	(Benoni, Classical, 11.f3)</Option>
          <Option value="A80">A80	(Dutch)</Option>
          <Option value="A81">A81	(Dutch)</Option>
          <Option value="A82">A82	(Dutch, Staunton Gambit)</Option>
          <Option value="A83">A83	(Dutch, Staunton Gambit)</Option>
          <Option value="A84">A84	(Dutch)</Option>
          <Option value="A85">A85	(Dutch, with c4 & Nc3)</Option>
          <Option value="A86">A86	(Dutch)</Option>
          <Option value="A87">A87	(Dutch, Leningrad, Main Variation)</Option>
          <Option value="A88">A88	(Dutch, Leningrad, Main Variation with c6)</Option>
          <Option value="A89">A89	(Dutch, Leningrad, Main Variation with Nc6)</Option>
          <Option value="A90">A90	(Dutch)</Option>
          <Option value="A91">A91	(Dutch Defense)</Option>
          <Option value="A92">A92	(Dutch)</Option>
          <Option value="A93">A93	(Dutch, Stonewall, Botvinnik Variation)</Option>
          <Option value="A94">A94	(Dutch, Stonewall with Ba3)</Option>
          <Option value="A95">A95	(Dutch, Stonewall)</Option>
          <Option value="A96">A96	(Dutch, Classical Variation)</Option>
          <Option value="A97">A97	(Dutch, Ilyin-Genevsky)</Option>
          <Option value="A98">A98	(Dutch, Ilyin-Genevsky Variation with Qc2)</Option>
          <Option value="A99">A99	(Dutch, Ilyin-Genevsky Variation with b3)</Option>
          <Option value="B00">B00	(Uncommon King's Pawn Opening)</Option>
          <Option value="B01">B01	(Scandinavian)</Option>
          <Option value="B02">B02	(Alekhine's Defense)</Option>
          <Option value="B03">B03	(Alekhine's Defense)</Option>
          <Option value="B04">B04	(Alekhine's Defense, Modern)</Option>
          <Option value="B05">B05	(Alekhine's Defense, Modern)</Option>
          <Option value="B06">B06	(Robatsch)</Option>
          <Option value="B07">B07	(Pirc)</Option>
          <Option value="B08">B08	(Pirc, Classical)</Option>
          <Option value="B09">B09	(Pirc, Austrian Attack)</Option>
          <Option value="B10">B10	(Caro-Kann)</Option>
          <Option value="B11">B11	(Caro-Kann, Two Knights, 3...Bg4)</Option>
          <Option value="B12">B12	(Caro-Kann Defense)</Option>
          <Option value="B13">B13	(Caro-Kann, Exchange)</Option>
          <Option value="B14">B14	(Caro-Kann, Panov-Botvinnik Attack)</Option>
          <Option value="B15">B15	(Caro-Kann)</Option>
          <Option value="B16">B16	(Caro-Kann, Bronstein-Larsen Variation)</Option>
          <Option value="B17">B17	(Caro-Kann, Steinitz Variation)</Option>
          <Option value="B18">B18	(Caro-Kann, Classical)</Option>
          <Option value="B19">B19	(Caro-Kann, Classical)</Option>
          <Option value="B20">B20	(Sicilian)</Option>
          <Option value="B21">B21	(Sicilian, 2.f4 and 2.d4)</Option>
          <Option value="B22">B22	(Sicilian, Alapin)</Option>
          <Option value="B23">B23	(Sicilian, Closed)</Option>
          <Option value="B24">B24	(Sicilian, Closed)</Option>
          <Option value="B25">B25	(Sicilian, Closed)</Option>
          <Option value="B26">B26	(Sicilian, Closed, 6.Be3)</Option>
          <Option value="B27">B27	(Sicilian)</Option>
          <Option value="B28">B28	(Sicilian, O'Kelly Variation)</Option>
          <Option value="B29">B29	(Sicilian, Nimzovich-Rubinstein)</Option>
          <Option value="B30">B30	(Sicilian)</Option>
          <Option value="B31">B31	(Sicilian, Rossolimo Variation)</Option>
          <Option value="B32">B32	(Sicilian)</Option>
          <Option value="B33">B33	(Sicilian)</Option>
          <Option value="B34">B34	(Sicilian, Accelerated Fianchetto)</Option>
          <Option value="B35">B35	(Sicilian, Accelerated Fianchetto, Modern Variation with Bc4)</Option>
          <Option value="B36">B36	(Sicilian, Accelerated Fianchetto)</Option>
          <Option value="B37">B37	(Sicilian, Accelerated Fianchetto)</Option>
          <Option value="B38">B38	(Sicilian, Accelerated Fianchetto, Maroczy Bind, 6.Be3)</Option>
          <Option value="B39">B39	(Sicilian, Accelerated Fianchetto, Breyer Variation)</Option>
          <Option value="B40">B40	(Sicilian)</Option>
          <Option value="B41">B41	(Sicilian, Kan)</Option>
          <Option value="B42">B42	(Sicilian, Kan)</Option>
          <Option value="B43">B43	(Sicilian, Kan, 5.Nc3)</Option>
          <Option value="B44">B44	(Sicilian)</Option>
          <Option value="B45">B45	(Sicilian, Taimanov)</Option>
          <Option value="B46">B46	(Sicilian, Taimanov Variation)</Option>
          <Option value="B47">B47	(Sicilian, Taimanov (Bastrikov) Variation)</Option>
          <Option value="B48">B48	(Sicilian, Taimanov Variation)</Option>
          <Option value="B49">B49	(Sicilian, Taimanov Variation)</Option>
          <Option value="B50">B50	(Sicilian)</Option>
          <Option value="B51">B51	(Sicilian, Canal-Sokolsky (Rossolimo) Attack)</Option>
          <Option value="B52">B52	(Sicilian, Canal-Sokolsky (Rossolimo) Attack)</Option>
          <Option value="B53">B53	(Sicilian)</Option>
          <Option value="B54">B54	(Sicilian)</Option>
          <Option value="B55">B55	(Sicilian, Prins Variation, Venice Attack)</Option>
          <Option value="B56">B56	(Sicilian)</Option>
          <Option value="B57">B57	(Sicilian)</Option>
          <Option value="B58">B58	(Sicilian)</Option>
          <Option value="B59">B59	(Sicilian, Boleslavsky Variation, 7.Nb3)</Option>
          <Option value="B60">B60	(Sicilian, Richter-Rauzer)</Option>
          <Option value="B61">B61	(Sicilian, Richter-Rauzer, Larsen Variation, 7.Qd2)</Option>
          <Option value="B62">B62	(Sicilian, Richter-Rauzer)</Option>
          <Option value="B63">B63	(Sicilian, Richter-Rauzer Attack)</Option>
          <Option value="B64">B64	(Sicilian, Richter-Rauzer Attack)</Option>
          <Option value="B65">B65	(Sicilian, Richter-Rauzer Attack, 7...Be7 Defense, 9...Nxd4)</Option>
          <Option value="B66">B66	(Sicilian, Richter-Rauzer Attack, 7...a6)</Option>
          <Option value="B67">B67	(Sicilian, Richter-Rauzer Attack, 7...a6 Defense, 8...Bd7)</Option>
          <Option value="B68">B68	(Sicilian, Richter-Rauzer Attack, 7...a6 Defense, 9...Be7)</Option>
          <Option value="B69">B69	(Sicilian, Richter-Rauzer Attack, 7...a6 Defense, 11.Bxf6)</Option>
          <Option value="B70">B70	(Sicilian, Dragon Variation)</Option>
          <Option value="B71">B71	(Sicilian, Dragon, Levenfish Variation)</Option>
          <Option value="B72">B72	(Sicilian, Dragon)</Option>
          <Option value="B73">B73	(Sicilian, Dragon, Classical)</Option>
          <Option value="B74">B74	(Sicilian, Dragon, Classical)</Option>
          <Option value="B75">B75	(Sicilian, Dragon, Yugoslav Attack)</Option>
          <Option value="B76">B76	(Sicilian, Dragon, Yugoslav Attack)</Option>
          <Option value="B77">B77	(Sicilian, Dragon, Yugoslav Attack)</Option>
          <Option value="B78">B78	(Sicilian, Dragon, Yugoslav Attack, 10.castle long)</Option>
          <Option value="B79">B79	(Sicilian, Dragon, Yugoslav Attack, 12.h4)</Option>
          <Option value="B80">B80	(Sicilian, Scheveningen)</Option>
          <Option value="B81">B81	(Sicilian, Scheveningen, Keres Attack)</Option>
          <Option value="B82">B82	(Sicilian, Scheveningen)</Option>
          <Option value="B83">B83	(Sicilian)</Option>
          <Option value="B84">B84	(Sicilian, Scheveningen)</Option>
          <Option value="B85">B85	(Sicilian, Scheveningen, Classical)</Option>
          <Option value="B86">B86	(Sicilian, Fischer-Sozin Attack)</Option>
          <Option value="B87">B87	(Sicilian, Fischer-Sozin with ...a6 and ...b5)</Option>
          <Option value="B88">B88	(Sicilian, Fischer-Sozin Attack)</Option>
          <Option value="B89">B89	(Sicilian)</Option>
          <Option value="B90">B90	(Sicilian, Najdorf)</Option>
          <Option value="B91">B91	(Sicilian, Najdorf, Zagreb (Fianchetto) Variation)</Option>
          <Option value="B92">B92	(Sicilian, Najdorf, Opocensky Variation)</Option>
          <Option value="B93">B93	(Sicilian, Najdorf, 6.f4)</Option>
          <Option value="B94">B94	(Sicilian, Najdorf)</Option>
          <Option value="B95">B95	(Sicilian, Najdorf, 6...e6)</Option>
          <Option value="B96">B96	(Sicilian, Najdorf)</Option>
          <Option value="B97">B97	(Sicilian, Najdorf)</Option>
          <Option value="B98">B98	(Sicilian, Najdorf)</Option>
          <Option value="B99">B99	(Sicilian, Najdorf, 7...Be7 Main line)</Option>
          <Option value="C00">C00	(French Defense)</Option>
          <Option value="C01">C01	(French, Exchange)</Option>
          <Option value="C02">C02	(French, Advance)</Option>
          <Option value="C03">C03	(French, Tarrasch)</Option>
          <Option value="C04">C04	(French, Tarrasch, Guimard Main line)</Option>
          <Option value="C05">C05	(French, Tarrasch)</Option>
          <Option value="C06">C06	(French, Tarrasch)</Option>
          <Option value="C07">C07	(French, Tarrasch)</Option>
          <Option value="C08">C08	(French, Tarrasch, Open, 4.ed ed)</Option>
          <Option value="C09">C09	(French, Tarrasch, Open Variation, Main line)</Option>
          <Option value="C10">C10	(French)</Option>
          <Option value="C11">C11	(French)</Option>
          <Option value="C12">C12	(French, McCutcheon)</Option>
          <Option value="C13">C13	(French)</Option>
          <Option value="C14">C14	(French, Classical)</Option>
          <Option value="C15">C15	(French, Winawer)</Option>
          <Option value="C16">C16	(French, Winawer)</Option>
          <Option value="C17">C17	(French, Winawer, Advance)</Option>
          <Option value="C18">C18	(French, Winawer)</Option>
          <Option value="C19">C19	(French, Winawer, Advance)</Option>
          <Option value="C20">C20	(King's Pawn Game)</Option>
          <Option value="C21">C21	(Center Game)</Option>
          <Option value="C22">C22	(Center Game)</Option>
          <Option value="C23">C23	(Bishop's Opening)</Option>
          <Option value="C24">C24	(Bishop's Opening)</Option>
          <Option value="C25">C25	(Vienna)</Option>
          <Option value="C26">C26	(Vienna)</Option>
          <Option value="C27">C27	(Vienna Game)</Option>
          <Option value="C28">C28	(Vienna Game)</Option>
          <Option value="C29">C29	(Vienna Gambit)</Option>
          <Option value="C30">C30	(King's Gambit Declined)</Option>
          <Option value="C31">C31	(King's Gambit Declined, Falkbeer Counter Gambit)</Option>
          <Option value="C32">C32	(King's Gambit Declined, Falkbeer Counter Gambit)</Option>
          <Option value="C33">C33	(King's Gambit Accepted)</Option>
          <Option value="C34">C34	(King's Gambit Accepted)</Option>
          <Option value="C35">C35	(King's Gambit Accepted, Cunningham)</Option>
          <Option value="C36">C36	(King's Gambit Accepted, Abbazia Defense)</Option>
          <Option value="C37">C37	(King's Gambit Accepted)</Option>
          <Option value="C38">C38	(King's Gambit Accepted)</Option>
          <Option value="C39">C39	(King's Gambit Accepted)</Option>
          <Option value="C40">C40	(King's Knight Opening)</Option>
          <Option value="C41">C41	(Philidor Defense)</Option>
          <Option value="C42">C42	(Petrov Defense)</Option>
          <Option value="C43">C43	(Petrov, Modern Attack)</Option>
          <Option value="C44">C44	(King's Pawn Game)</Option>
          <Option value="C45">C45	(Scotch Game)</Option>
          <Option value="C46">C46	(Three Knights)</Option>
          <Option value="C47">C47	(Four Knights)</Option>
          <Option value="C48">C48	(Four Knights)</Option>
          <Option value="C49">C49	(Four Knights)</Option>
          <Option value="C50">C50	(Giuoco Piano)</Option>
          <Option value="C51">C51	(Evans Gambit)</Option>
          <Option value="C52">C52	(Evans Gambit)</Option>
          <Option value="C53">C53	(Giuoco Piano)</Option>
          <Option value="C54">C54	(Giuoco Piano)</Option>
          <Option value="C55">C55	(Two Knights Defense)</Option>
          <Option value="C56">C56	(Two Knights)</Option>
          <Option value="C57">C57	(Two Knights)</Option>
          <Option value="C58">C58	(Two Knights)</Option>
          <Option value="C59">C59	(Two Knights)</Option>
          <Option value="C60">C60	(Ruy Lopez)</Option>
          <Option value="C61">C61	(Ruy Lopez, Bird's Defense)</Option>
          <Option value="C62">C62	(Ruy Lopez, Old Steinitz Defense)</Option>
          <Option value="C63">C63	(Ruy Lopez, Schliemann Defense)</Option>
          <Option value="C64">C64	(Ruy Lopez, Classical)</Option>
          <Option value="C65">C65	(Ruy Lopez, Berlin Defense)</Option>
          <Option value="C66">C66	(Ruy Lopez)</Option>
          <Option value="C67">C67	(Ruy Lopez)</Option>
          <Option value="C68">C68	(Ruy Lopez, Exchange)</Option>
          <Option value="C69">C69	(Ruy Lopez, Exchange, Gligoric Variation)</Option>
          <Option value="C70">C70	(Ruy Lopez)</Option>
          <Option value="C71">C71	(Ruy Lopez)</Option>
          <Option value="C72">C72	(Ruy Lopez, Modern Steinitz Defense, 5.O-O)</Option>
          <Option value="C73">C73	(Ruy Lopez, Modern Steinitz Defense)</Option>
          <Option value="C74">C74	(Ruy Lopez, Modern Steinitz Defense)</Option>
          <Option value="C75">C75	(Ruy Lopez, Modern Steinitz Defense)</Option>
          <Option value="C76">C76	(Ruy Lopez, Modern Steinitz Defense, Fianchetto Variation)</Option>
          <Option value="C77">C77	(Ruy Lopez)</Option>
          <Option value="C78">C78	(Ruy Lopez)</Option>
          <Option value="C79">C79	(Ruy Lopez, Steinitz Defense Deferred)</Option>
          <Option value="C80">C80	(Ruy Lopez, Open)</Option>
          <Option value="C81">C81	(Ruy Lopez, Open, Howell Attack)</Option>
          <Option value="C82">C82	(Ruy Lopez, Open)</Option>
          <Option value="C83">C83	(Ruy Lopez, Open)</Option>
          <Option value="C84">C84	(Ruy Lopez, Closed)</Option>
          <Option value="C85">C85	(Ruy Lopez, Exchange Variation Doubly Deferred (DERLD))</Option>
          <Option value="C86">C86	(Ruy Lopez, Worrall Attack)</Option>
          <Option value="C87">C87	(Ruy Lopez)</Option>
          <Option value="C88">C88	(Ruy Lopez)</Option>
          <Option value="C89">C89	(Ruy Lopez, Marshall)</Option>
          <Option value="C90">C90	(Ruy Lopez, Closed)</Option>
          <Option value="C91">C91	(Ruy Lopez, Closed)</Option>
          <Option value="C92">C92	(Ruy Lopez, Closed)</Option>
          <Option value="C93">C93	(Ruy Lopez, Closed, Smyslov Defense)</Option>
          <Option value="C94">C94	(Ruy Lopez, Closed, Breyer Defense)</Option>
          <Option value="C95">C95	(Ruy Lopez, Closed, Breyer)</Option>
          <Option value="C96">C96	(Ruy Lopez, Closed)</Option>
          <Option value="C97">C97	(Ruy Lopez, Closed, Chigorin)</Option>
          <Option value="C98">C98	(Ruy Lopez, Closed, Chigorin)</Option>
          <Option value="C99">C99	(Ruy Lopez, Closed, Chigorin, 12...cd)</Option>
          <Option value="D00">D00	(Queen's Pawn Game)</Option>
          <Option value="D01">D01	(Richter-Veresov Attack)</Option>
          <Option value="D02">D02	(Queen's Pawn Game)</Option>
          <Option value="D03">D03	(Torre Attack (Tartakower Variation))</Option>
          <Option value="D04">D04	(Queen's Pawn Game)</Option>
          <Option value="D05">D05	(Queen's Pawn Game)</Option>
          <Option value="D06">D06	(Queen's Gambit Declined)</Option>
          <Option value="D07">D07	(Queen's Gambit Declined, Chigorin Defense)</Option>
          <Option value="D08">D08	(Queen's Gambit Declined, Albin Counter Gambit)</Option>
          <Option value="D09">D09	(Queen's Gambit Declined, Albin Counter Gambit, 5.g3)</Option>
          <Option value="D10">D10	(Queen's Gambit Declined Slav)</Option>
          <Option value="D11">D11	(Queen's Gambit Declined Slav)</Option>
          <Option value="D12">D12	(Queen's Gambit Declined Slav)</Option>
          <Option value="D13">D13	(Queen's Gambit Declined Slav, Exchange Variation)</Option>
          <Option value="D14">D14	(Queen's Gambit Declined Slav, Exchange Variation)</Option>
          <Option value="D15">D15	(Queen's Gambit Declined Slav)</Option>
          <Option value="D16">D16	(Queen's Gambit Declined Slav)</Option>
          <Option value="D17">D17	(Queen's Gambit Declined Slav)</Option>
          <Option value="D18">D18	(Queen's Gambit Declined Slav, Dutch)</Option>
          <Option value="D19">D19	(Queen's Gambit Declined Slav, Dutch)</Option>
          <Option value="D20">D20	(Queen's Gambit Accepted)</Option>
          <Option value="D21">D21	(Queen's Gambit Accepted)</Option>
          <Option value="D22">D22	(Queen's Gambit Accepted)</Option>
          <Option value="D23">D23	(Queen's Gambit Accepted)</Option>
          <Option value="D24">D24	(Queen's Gambit Accepted)</Option>
          <Option value="D25">D25	(Queen's Gambit Accepted)</Option>
          <Option value="D26">D26	(Queen's Gambit Accepted)</Option>
          <Option value="D27">D27	(Queen's Gambit Accepted, Classical)</Option>
          <Option value="D28">D28	(Queen's Gambit Accepted, Classical)</Option>
          <Option value="D29">D29	(Queen's Gambit Accepted, Classical)</Option>
          <Option value="D30">D30	(Queen's Gambit Declined)</Option>
          <Option value="D31">D31	(Queen's Gambit Declined)</Option>
          <Option value="D32">D32	(Queen's Gambit Declined, Tarrasch)</Option>
          <Option value="D33">D33	(Queen's Gambit Declined, Tarrasch)</Option>
          <Option value="D34">D34	(Queen's Gambit Declined, Tarrasch)</Option>
          <Option value="D35">D35	(Queen's Gambit Declined)</Option>
          <Option value="D36">D36	(Queen's Gambit Declined, Exchange, Positional line, 6.Qc2)</Option>
          <Option value="D37">D37	(Queen's Gambit Declined)</Option>
          <Option value="D38">D38	(Queen's Gambit Declined, Ragozin Variation)</Option>
          <Option value="D39">D39	(Queen's Gambit Declined, Ragozin, Vienna Variation)</Option>
          <Option value="D40">D40	(Queen's Gambit Declined, Semi-Tarrasch)</Option>
          <Option value="D41">D41	(Queen's Gambit Declined, Semi-Tarrasch)</Option>
          <Option value="D42">D42	(Queen's Gambit Declined, Semi-Tarrasch, 7.Bd3)</Option>
          <Option value="D43">D43	(Queen's Gambit Declined Semi-Slav)</Option>
          <Option value="D44">D44	(Queen's Gambit Declined Semi-Slav)</Option>
          <Option value="D45">D45	(Queen's Gambit Declined Semi-Slav)</Option>
          <Option value="D46">D46	(Queen's Gambit Declined Semi-Slav)</Option>
          <Option value="D47">D47	(Queen's Gambit Declined Semi-Slav)</Option>
          <Option value="D48">D48	(Queen's Gambit Declined Semi-Slav, Meran)</Option>
          <Option value="D49">D49	(Queen's Gambit Declined Semi-Slav, Meran)</Option>
          <Option value="D50">D50	(Queen's Gambit Declined)</Option>
          <Option value="D51">D51	(Queen's Gambit Declined)</Option>
          <Option value="D52">D52	(Queen's Gambit Declined)</Option>
          <Option value="D53">D53	(Queen's Gambit Declined)</Option>
          <Option value="D54">D54	(Queen's Gambit Declined, Anti-Neo-Orthodox Variation)</Option>
          <Option value="D55">D55	(Queen's Gambit Declined)</Option>
          <Option value="D56">D56	(Queen's Gambit Declined)</Option>
          <Option value="D57">D57	(Queen's Gambit Declined, Lasker Defense)</Option>
          <Option value="D58">D58	(Queen's Gambit Declined, Tartakower (Makagonov-Bondarevsky) System)</Option>
          <Option value="D59">D59	(Queen's Gambit Declined, Tartakower)</Option>
          <Option value="D60">D60	(Queen's Gambit Declined, Orthodox Defense)</Option>
          <Option value="D61">D61	(Queen's Gambit Declined, Orthodox, Rubinstein Attack)</Option>
          <Option value="D62">D62	(Queen's Gambit Declined, Orthodox, Rubinstein Attack)</Option>
          <Option value="D63">D63	(Queen's Gambit Declined, Orthodox Defense)</Option>
          <Option value="D64">D64	(Queen's Gambit Declined, Orthodox, Rubinstein Attack)</Option>
          <Option value="D65">D65	(Queen's Gambit Declined, Orthodox, Rubinstein Attack, Main line)</Option>
          <Option value="D66">D66	(Queen's Gambit Declined, Orthodox Defense, Bd3 line)</Option>
          <Option value="D67">D67	(Queen's Gambit Declined, Orthodox Defense, Bd3 line)</Option>
          <Option value="D68">D68	(Queen's Gambit Declined, Orthodox Defense, Classical)</Option>
          <Option value="D69">D69	(Queen's Gambit Declined, Orthodox Defense, Classical, 13.de)</Option>
          <Option value="D70">D70	(Neo-Grunfeld Defense)</Option>
          <Option value="D71">D71	(Neo-Grunfeld)</Option>
          <Option value="D72">D72	(Neo-Grunfeld, 5.cd, Main line)</Option>
          <Option value="D73">D73	(Neo-Grunfeld, 5.Nf3)</Option>
          <Option value="D74">D74	(Neo-Grunfeld, 6.cd Nxd5, 7.O-O)</Option>
          <Option value="D75">D75	(Neo-Grunfeld, 6.cd Nxd5, 7.O-O c5, 8.dxc5)</Option>
          <Option value="D76">D76	(Neo-Grunfeld, 6.cd Nxd5, 7.O-O Nb6)</Option>
          <Option value="D77">D77	(Neo-Grunfeld, 6.O-O)</Option>
          <Option value="D78">D78	(Neo-Grunfeld, 6.O-O c6)</Option>
          <Option value="D79">D79	(Neo-Grunfeld, 6.O-O, Main line)</Option>
          <Option value="D80">D80	(Grunfeld)</Option>
          <Option value="D81">D81	(Grunfeld, Russian Variation)</Option>
          <Option value="D82">D82	(Grunfeld, 4.Bf4)</Option>
          <Option value="D83">D83	(Grunfeld, Grunfeld Gambit)</Option>
          <Option value="D84">D84	(Grunfeld, Grunfeld Gambit Accepted)</Option>
          <Option value="D85">D85	(Grunfeld)</Option>
          <Option value="D86">D86	(Grunfeld, Exchange)</Option>
          <Option value="D87">D87	(Grunfeld, Exchange)</Option>
          <Option value="D88">D88	(Grunfeld, Spassky Variation, Main line, 10...cd, 11.cd)</Option>
          <Option value="D89">D89	(Grunfeld)</Option>
          <Option value="D90">D90	(Grunfeld)</Option>
          <Option value="D91">D91	(Grunfeld, 5.Bg5)</Option>
          <Option value="D92">D92	(Grunfeld, 5.Bf4)</Option>
          <Option value="D93">D93	(Grunfeld, with Bf4 & e3)</Option>
          <Option value="D94">D94	(Grunfeld)</Option>
          <Option value="D95">D95	(Grunfeld)</Option>
          <Option value="D96">D96	(Grunfeld, Russian Variation)</Option>
          <Option value="D97">D97	(Grunfeld, Russian)</Option>
          <Option value="D98">D98	(Grunfeld, Russian)</Option>
          <Option value="D99">D99	(Grunfeld Defense, Smyslov)</Option>
          <Option value="E00">E00	(Queen's Pawn Game)</Option>
          <Option value="E01">E01	(Catalan, Closed)</Option>
          <Option value="E02">E02	(Catalan, Open, 5.Qa4)</Option>
          <Option value="E03">E03	(Catalan, Open)</Option>
          <Option value="E04">E04	(Catalan, Open, 5.Nf3)</Option>
          <Option value="E05">E05	(Catalan, Open, Classical line)</Option>
          <Option value="E06">E06	(Catalan, Closed, 5.Nf3)</Option>
          <Option value="E07">E07	(Catalan, Closed)</Option>
          <Option value="E08">E08	(Catalan, Closed)</Option>
          <Option value="E09">E09	(Catalan, Closed)</Option>
          <Option value="E10">E10	(Queen's Pawn Game)</Option>
          <Option value="E11">E11	(Bogo-Indian Defense)</Option>
          <Option value="E12">E12	(Queen's Indian)</Option>
          <Option value="E13">E13	(Queen's Indian, 4.Nc3, Main line)</Option>
          <Option value="E14">E14	(Queen's Indian)</Option>
          <Option value="E15">E15	(Queen's Indian)</Option>
          <Option value="E16">E16	(Queen's Indian)</Option>
          <Option value="E17">E17	(Queen's Indian)</Option>
          <Option value="E18">E18	(Queen's Indian, Old Main line, 7.Nc3)</Option>
          <Option value="E19">E19	(Queen's Indian, Old Main line, 9.Qxc3)</Option>
          <Option value="E20">E20	(Nimzo-Indian)</Option>
          <Option value="E21">E21	(Nimzo-Indian, Three Knights)</Option>
          <Option value="E22">E22	(Nimzo-Indian, Spielmann Variation)</Option>
          <Option value="E23">E23	(Nimzo-Indian, Spielmann)</Option>
          <Option value="E24">E24	(Nimzo-Indian, Samisch)</Option>
          <Option value="E25">E25	(Nimzo-Indian, Samisch)</Option>
          <Option value="E26">E26	(Nimzo-Indian, Samisch)</Option>
          <Option value="E27">E27	(Nimzo-Indian, Samisch Variation)</Option>
          <Option value="E28">E28	(Nimzo-Indian, Samisch Variation)</Option>
          <Option value="E29">E29	(Nimzo-Indian, Samisch)</Option>
          <Option value="E30">E30	(Nimzo-Indian, Leningrad)</Option>
          <Option value="E31">E31	(Nimzo-Indian, Leningrad, Main line)</Option>
          <Option value="E32">E32	(Nimzo-Indian, Classical)</Option>
          <Option value="E33">E33	(Nimzo-Indian, Classical)</Option>
          <Option value="E34">E34	(Nimzo-Indian, Classical, Noa Variation)</Option>
          <Option value="E35">E35	(Nimzo-Indian, Classical, Noa Variation, 5.cd ed)</Option>
          <Option value="E36">E36	(Nimzo-Indian, Classical)</Option>
          <Option value="E37">E37	(Nimzo-Indian, Classical)</Option>
          <Option value="E38">E38	(Nimzo-Indian, Classical, 4...c5)</Option>
          <Option value="E39">E39	(Nimzo-Indian, Classical, Pirc Variation)</Option>
          <Option value="E40">E40	(Nimzo-Indian, 4.e3)</Option>
          <Option value="E41">E41	(Nimzo-Indian)</Option>
          <Option value="E42">E42	(Nimzo-Indian, 4.e3 c5, 5.Ne2 (Rubinstein))</Option>
          <Option value="E43">E43	(Nimzo-Indian, Fischer Variation)</Option>
          <Option value="E44">E44	(Nimzo-Indian, Fischer Variation, 5.Ne2)</Option>
          <Option value="E45">E45	(Nimzo-Indian, 4.e3, Bronstein (Byrne) Variation)</Option>
          <Option value="E46">E46	(Nimzo-Indian)</Option>
          <Option value="E47">E47	(Nimzo-Indian, 4.e3 O-O 5.Bd3)</Option>
          <Option value="E48">E48	(Nimzo-Indian, 4.e3 O-O 5.Bd3 d5)</Option>
          <Option value="E49">E49	(Nimzo-Indian, 4.e3, Botvinnik System)</Option>
          <Option value="E50">E50	(Nimzo-Indian, 4.e3 O-O 5.Nf3, without ...d5)</Option>
          <Option value="E51">E51	(Nimzo-Indian, 4.e3)</Option>
          <Option value="E52">E52	(Nimzo-Indian, 4.e3, Main line with ...b6)</Option>
          <Option value="E53">E53	(Nimzo-Indian, 4.e3)</Option>
          <Option value="E54">E54	(Nimzo-Indian, 4.e3, Gligoric System)</Option>
          <Option value="E55">E55	(Nimzo-Indian, 4.e3, Gligoric System, Bronstein Variation)</Option>
          <Option value="E56">E56	(Nimzo-Indian, 4.e3, Main line with 7...Nc6)</Option>
          <Option value="E57">E57	(Nimzo-Indian, 4.e3, Main line with 8...dc and 9...cd)</Option>
          <Option value="E58">E58	(Nimzo-Indian, 4.e3, Main line with 8...Bxc3)</Option>
          <Option value="E59">E59	(Nimzo-Indian, 4.e3, Main line)</Option>
          <Option value="E60">E60	(King's Indian Defense)</Option>
          <Option value="E61">E61	(King's Indian)</Option>
          <Option value="E62">E62	(King's Indian, Fianchetto)</Option>
          <Option value="E63">E63	(King's Indian, Fianchetto, Panno Variation)</Option>
          <Option value="E64">E64	(King's Indian, Fianchetto, Yugoslav System)</Option>
          <Option value="E65">E65	(King's Indian, Fianchetto, Yugoslav, 7.O-O)</Option>
          <Option value="E66">E66	(King's Indian, Fianchetto, Yugoslav Panno)</Option>
          <Option value="E67">E67	(King's Indian, Fianchetto)</Option>
          <Option value="E68">E68	(King's Indian, Fianchetto, Classical Variation, 8.e4)</Option>
          <Option value="E69">E69	(King's Indian, Fianchetto, Classical Main line)</Option>
          <Option value="E70">E70	(King's Indian)</Option>
          <Option value="E71">E71	(King's Indian, Makagonov System (5.h3))</Option>
          <Option value="E72">E72	(King's Indian)</Option>
          <Option value="E73">E73	(King's Indian)</Option>
          <Option value="E74">E74	(King's Indian, Averbakh, 6...c5)</Option>
          <Option value="E75">E75	(King's Indian, Averbakh, Main line)</Option>
          <Option value="E76">E76	(King's Indian, Four Pawns Attack)</Option>
          <Option value="E77">E77	(King's Indian)</Option>
          <Option value="E78">E78	(King's Indian, Four Pawns Attack, with Be2 and Nf3)</Option>
          <Option value="E79">E79	(King's Indian, Four Pawns Attack, Main line)</Option>
          <Option value="E80">E80	(King's Indian, Samisch Variation)</Option>
          <Option value="E81">E81	(King's Indian, Samisch)</Option>
          <Option value="E82">E82	(King's Indian, Samisch, double Fianchetto Variation)</Option>
          <Option value="E83">E83	(King's Indian, Samisch)</Option>
          <Option value="E84">E84	(King's Indian, Samisch, Panno Main line)</Option>
          <Option value="E85">E85	(King's Indian, Samisch, Orthodox Variation)</Option>
          <Option value="E86">E86	(King's Indian, Samisch, Orthodox, 7.Nge2 c6)</Option>
          <Option value="E87">E87	(King's Indian, Samisch, Orthodox)</Option>
          <Option value="E88">E88	(King's Indian, Samisch, Orthodox, 7.d5 c6)</Option>
          <Option value="E89">E89	(King's Indian, Samisch, Orthodox Main line)</Option>
          <Option value="E90">E90	(King's Indian)</Option>
          <Option value="E91">E91	(King's Indian)</Option>
          <Option value="E92">E92	(King's Indian)</Option>
          <Option value="E93">E93	(King's Indian, Petrosian System)</Option>
          <Option value="E94">E94	(King's Indian, Orthodox)</Option>
          <Option value="E95">E95	(King's Indian, Orthodox, 7...Nbd7, 8.Re1)</Option>
          <Option value="E96">E96	(King's Indian, Orthodox, 7...Nbd7, Main line)</Option>
          <Option value="E97">E97	(King's Indian)</Option>
          <Option value="E98">E98	(King's Indian, Orthodox, Taimanov, 9.Ne1)</Option>
          <Option value="E99">E99	(King's Indian, Orthodox, Taimanov)</Option>
        </Select>
      </Form.Item>
           
      <Form.List name="nextMoves">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                  }
                >
                  {() => (
                    <Form.Item
                      {...field}
                      label="Move Notation"
                      name={[field.name, 'moveNotation']}
                      fieldKey={[field.fieldKey, 'moveNotation']}
                      rules={[{ required: true, message: 'Missing move' }]}
                    >
                      <Input style={{ width: 130 }} />
                    </Form.Item>
                  )}
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Format"
                  name={[field.name, 'format']}
                  fieldKey={[field.fieldKey, 'format']}
                  rules={[{ required: true, message: 'Missing format' }]}
                >
                  <Select style={{ width: 130 }}>
                    <Option value='SAN'>SAN</Option>
                    <Option value='UCI'>UCI</Option>
                  </Select>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Next Move
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>        

    </Layout>
  );
}