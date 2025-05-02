class TicketDAO {
  async create(ticketData) {
    return await Ticket.create(ticketData);
  }

  async getById(id) {
    return await Ticket.findById(id);
  }

  async getByCode(code) {
    return await Ticket.findOne({ code });
  }
}

export default TicketDAO;