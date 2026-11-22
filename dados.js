// [código, emoji, nome curto, nome completo, responsável, atividades típicas, terceirizada]
var S=[
{id:"com",side:"n",name:"Comercial",ps:[
["COM-01","💬","Vendas ativa e passiva","Vendas ativa e passiva","Comercial","Prospecção, atendimento de demandas, orçamentos e propostas, negociação, fechamento, cadastro de cliente"],
["COM-02","🤝","Pós-venda","Pós-venda","Comercial","Acompanhamento após entrega/locação, tratativa de reclamações, renovações"],
["COM-03","⭐","Relacionamento com cliente","Relacionamento com o cliente","Comercial","Atendimento, visitas, pesquisa de satisfação, comunicação de informações ao cliente"]]},
{id:"ope",side:"n",name:"Operação logística",ps:[
["OPE-01","🚢","Operação – Seatrium","Operação – Seatrium","","Programação, mobilização e desmobilização, execução dos serviços, atendimento ao contrato"],
["OPE-02","⛏️","Operação – Vale","Operação – Vale","","Programação, mobilização e desmobilização, execução dos serviços, atendimento ao contrato"],
["OPE-03","🏗️","Operação – AMT","Operação – AMT","","Programação, mobilização e desmobilização, execução dos serviços, atendimento ao contrato"],
["OPE-04","🛠️","Operação – RM","Operação – RM","","Programação, mobilização e desmobilização, execução dos serviços, atendimento ao contrato"],
["OPE-05","🚽","Produtividade – Fibravit","Produtividade – Fibravit (fabricação, locação, manutenção e venda)","","Fabricação de banheiros, lavatórios e módulos, locação, manutenção, sucção e abastecimento de água não potável, limpeza de módulos"],
["OPE-06","🚿","Produtividade – Service","Produtividade – Service (locação e manutenção)","","Locação e manutenção de banheiros, lavatórios e módulos, sucção e abastecimento, limpeza e manutenção dos módulos"]]},
{id:"ent",side:"n",name:"Produção e entrega",ps:[
["GES-04","🏭","Produção","Produção","Jhully","Planejamento e controle da fabricação, apontamentos, controle de qualidade do produto"],
["GES-07","🧾","Medição e faturamento","Medição e faturamento","José","Medição dos serviços, conferência com o cliente, emissão de NF, envio e acompanhamento"],
["GES-10","💧","Gestão da ETE","Gestão da ETE","José","Operação da estação de tratamento, coleta e transporte de efluente, relatórios e controles"]]},
{id:"ges",side:"a",name:"Gestão e controle",ps:[
["GES-01","🛒","Suprimentos","Suprimentos","Jhully","Requisição, cotação, pedido de compra, acompanhamento de entrega, avaliação de fornecedores"],
["GES-02","📦","Almoxarifado","Almoxarifado","Jhully","Recebimento, armazenagem, requisição e baixa, inventário"],
["GES-03","🧑‍🤝‍🧑","RH (Gente)","RH (Gente)","Jhully","Recrutamento, admissão, ponto e folha, benefícios, treinamentos, desligamento"],
["GES-05","🧹","Serviços gerais","Serviços gerais","Jhully","Limpeza, conservação e manutenção das instalações, apoio administrativo"],
["GES-06","🚚","Frota","Frota","José","Manutenção de veículos, abastecimento, documentação, controle de rotas e motoristas"],
["GES-08","📜","Documentação legal","Documentação legal","José","Licenças, alvarás, certidões, certificados, controle de vencimentos"],
["GES-09","🔧","Gestão de ativos","Gestão de ativos","José","Controle patrimonial, manutenção e calibração de equipamentos, baixa de ativos"],
["GES-11","📑","Gestão de contratos","Gestão de contratos","José","Controle de vigência, aditivos, reajustes, obrigações contratuais (clientes e fornecedores)"]]},
{id:"fin",side:"a",name:"Financeiro e controle",ps:[
["FIN-01","🏦","Financeiro","Financeiro","","Contas a pagar, contas a receber, fluxo de caixa, conciliação bancária, cobrança"],
["FIN-02","📊","Controladoria","Controladoria","","Orçamento, custos, relatórios gerenciais, indicadores de desempenho"],
["FIN-03","🧮","Contabilidade","Contabilidade","","Lançamentos, obrigações fiscais, fechamento mensal, envio de documentos ao contador",1],
["FIN-04","⚖️","Jurídico","Jurídico","","Análise de contratos, pareceres, acompanhamento de processos",1],
["FIN-05","💻","TI","TI","","Suporte a usuários, acessos, equipamentos, sistemas, backup",1]]},
{id:"dir",side:"a",name:"Direção e governança",ps:[
["DIR-01","🎯","Diretoria / Conselho","Conselho Consultivo / Diretoria","Diretoria","Definição de estratégia, aprovações, acompanhamento de resultados, decisões de investimento"],
["DIR-02","✅","SGQ – Qualidade","SGQ – Sistema de Gestão da Qualidade","Jhully","Controle de documentos, auditorias, indicadores, não conformidades e ações corretivas"],
["DIR-03","🦺","Riscos e SSMA","Controle de perigos e prevenção de riscos (SSMA)","","Identificação de perigos, controle de riscos, requisitos legais, gestão de resíduos gerados"],
["DIR-04","📣","Marketing / Comunicação","Marketing / Comunicação","","Material institucional, redes sociais, eventos, comunicação com clientes",1]]},
{id:"fil",side:"m",name:"Filiais",ps:[
["FIL-01","🌴","Filial Pará","Filial Pará (todos os processos locais)","","Atividades administrativas e operacionais executadas na filial"],
["FIL-02","🏝️","Filial Maranhão","Filial Maranhão (todos os processos locais)","","Atividades administrativas e operacionais executadas na filial"]]}
];
var KN={n:"Processo do negócio",a:"Processo de apoio",m:"Filial (negócio e apoio)"};
var FREQ=["Diária","Semanal","Quinzenal","Mensal","Eventual"];
