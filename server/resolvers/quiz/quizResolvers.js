module.exports = {
  Quiz: {
    async owner(parent, args, { postgres }, info) {
      const id = parent.owner_id

      return { id }
    }
  }
}
