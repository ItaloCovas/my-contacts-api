class ContactController {
  index(request, response) {
    // Listar todos os registros
    response.send('Send from Contact Controller');
  }

  show() {
    // Obter UM registro
  }

  store() {
    // Criar novo registro
  }

  update() {
    // Editar um registro
  }

  delete() {
    // Deletar um registro
  }
}

// Singleton => MESMA INSTÂNCIA DA CLASSE PARA TODA A APLICAÇÃO, POR ISSO EXPORTAR A INSTÂNCIA
module.exports = new ContactController();
