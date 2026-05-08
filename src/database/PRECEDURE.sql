delimiter $$
create procedure addClientes(qtd int)
begin
	declare i int default 0;
	while i<qtd do
		insert into cliente (nome, email, senha)
        values (concat('Cliente ',i), 
				concat('Cliente ',i,'@gmail.com'),
                concat('senha@',i));
		set i = i + 1;
	end while;
    select 'Procedure executada com sucesso!' as status,
    concat(qtd, ' Clientes fictícios gerados') as message;

end $$
delimiter ;

