const express = require('express');
const router = express.Router();
const supabase = require('../data/supabase'); // Usa sua conexão já existente

// ROTA POST: Onde o celular vai "bater" para enviar o pedido
router.post('/', async (req, res) => {
    try {
        const { itens, localizacao } = req.body;

        // Inserindo no Supabase
        const { data, error } = await supabase
            .from('pedidos') 
            .insert([{ 
                produtos: JSON.stringify(itens), 
                latitude: localizacao.lat, 
                longitude: localizacao.lng 
            }]);

        if (error) throw error;
        res.status(201).json({ mensagem: "Sucesso!", data });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

module.exports = router;