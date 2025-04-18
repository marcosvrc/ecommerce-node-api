describe('Exemplo de teste', () => {
  it('deve somar 2 + 2 e retornar 4', () => {
    expect(2 + 2).toBe(4);
  });

  it('deve verificar se um objeto tem uma propriedade específica', () => {
    const obj = {
      nome: 'Produto',
      preco: 100
    };

    expect(obj).toHaveProperty('nome');
    expect(obj.nome).toBe('Produto');
  });

  it('deve verificar se um array contém um elemento específico', () => {
    const array = ['maçã', 'banana', 'laranja'];

    expect(array).toContain('banana');
    expect(array).toHaveLength(3);
  });
});