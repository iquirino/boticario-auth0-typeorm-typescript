import L from '../../common/logger';

import axios from 'axios';

export class CashbackService {
    async getCashback(cpf: string): Promise<number> {
        L.info('fetch cashback of cpf ' + cpf);
        const unformatedCPF = cpf.replace(/\./g, "").replace(/-/g, "");

        const resp = await axios.request({
            method: 'GET',
            url: 'https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback',
            params: { cpf: unformatedCPF },
            headers: { token: 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm' }
        });

        if (resp.data?.statusCode === 200)
            return parseFloat(resp.data?.body?.credit);
        else
            throw new Error(resp.data?.body?.message);
    }
}

export default CashbackService;
