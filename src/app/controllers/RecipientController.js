import * as Yup from 'yup'
import Recipient from '../models/Recipient'

class RecipientController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),

            email: Yup.string().email().required(),

            street: Yup.string().required(),

            number: Yup.number().required(),

            complement: Yup.string(),

            state: Yup.string().required(),

            city: Yup.string().required(),

            zip_code: Yup.string().required(),

        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' })
        }
        const recipientExist = await Recipient.findOne({ where: { email: req.body.email } });
        if (recipientExist) {
            return res.status(400).json({ error: "User Already exists." })
        }



        const recipientSave = await Recipient.create(req.body);

        return res.json(recipientSave);
    }
    async update(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),

            street: Yup.string(),

            number: Yup.number(),

            complement: Yup.string(),

            state: Yup.string(),

            city: Yup.string(),

            zip_code: Yup.string(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' })
        }


        const { id } = req.params;

        const rec = await Recipient.findByPk(req.params.id);
        const recipientExists = await Recipient.findOne({ where: { id } });

        if (!recipientExists) {
            return res.status(401).json({ error: 'Recipient not found' });
        }



        const { email } = req.body;

        if (email !== rec.email) {
            const recExists = await Recipient.findOne({ where: { email } });

            if (recExists) {
                return res.status(400).json({ error: 'User already Exists' })
            }
        }

        await rec.update(req.body);

        return res.json(rec);
    }
}


export default new RecipientController();