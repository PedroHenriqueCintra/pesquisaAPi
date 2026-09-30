import axios from "axios";
import { Historico } from "@/app/api/Iapi";

const url = "https://viled.runasp.net/api/historico";

export async function ConectarApi(usuario: string): Promise<Historico[]> {
    const resposta = await axios.get<Historico[]>(`${url}/${usuario}/todos`);
    console.log(resposta);
    return resposta.data;
}

export async function MudarHistorico(usuario: string): Promise<Historico> {
    const resposta = await axios.post<Historico>(url + "?usuario=" + usuario);
    return resposta.data;
}