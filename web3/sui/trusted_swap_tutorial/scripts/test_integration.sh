export PACKAGE=0x0665ed0d428920697b7555d3287c0fc72ae37e3e32fe417e726219c7e05a8f97
export MODULE=nft_swap
export ORIG_OWNER1=0x9131ddf153485a64ac1da29fdb1f059cf228d1082bd96494ac50a973133ec55a
export ORIG_OWNER2=0xec8de5c2ca2c1756bf4ad783e4912e2e0cd2df7dd961d4f1d81de9c281b88d09
export SERVICE_OPERATOR=0x9f697fbf67ea353cb2184978d18f4281bb8537435f10159ea43b798c3ba36cc4

# Swapable
sui client switch --address $ORIG_OWNER1
sui client call --gas-budget 20000 --package $PACKAGE --module $MODULE --function "create_object" --args 10 1
sui client objects $ORIG_OWNER1 | grep $MODULE | cut -c1-67

# Swapable
sui client switch --address $ORIG_OWNER2
sui client call --gas-budget 20000 --package $PACKAGE --module $MODULE --function "create_object" --args 10 2
sui client objects $ORIG_OWNER2 | grep $MODULE | cut -c1-67

# Non-Swapable
sui client call --gas-budget 20000 --package $PACKAGE --module $MODULE --function "create_object" --args 5 2
sui client call --gas-budget 20000 --package $PACKAGE --module $MODULE --function "create_object" --args 10 1
sui client objects $ORIG_OWNER2 | grep $MODULE | cut -c1-67

# Split coins: takes a coin and creates 3 new ones (500, 1500, 1000) out of the initial which will be updated with the remaining balance
sui client split-coin --coin-id 0x0a76054dce7112846f6e5f8c82faa83a28e88dc9770feb82ec5c54ebc06256e7 --amounts 500 1500 1000 --gas-budget 20000

# OWNER2 requests swap below minimum fee (500 MIST): Results in ERROR
sui client call --gas-budget 20000 --package $PACKAGE --module $MODULE --function "request_swap" --args \
    "0x49d619e242cff993446692ad55d46895c6f8c4583176c8b8d4219616c76afea1" \
    "0xb5b6d811ec34b68d5b7794c2ff4478fcbfa1b8fa3a78b5d17934b2adee182c3f" \
    \"$SERVICE_OPERATOR\"

# OWNER2 requests swap below with minimum fee (1000 MIST)
sui client call --gas-budget 20000 --package $PACKAGE --module $MODULE --function "request_swap" --args \
    "0x49d619e242cff993446692ad55d46895c6f8c4583176c8b8d4219616c76afea1" \
    "0x8a98507a9c2dd1f89fea2aa8d316ba487e884044a400b5a2d73ee2952eea89fd" \
    \"$SERVICE_OPERATOR\"

# An ObjectWrapper is created to encapsulate OWNER2's original object and sent to the swap service operator
sui client objects $SERVICE_OPERATOR | grep $MODULE | cut -c1-67

# For fun, instead of splitting coins again, let's send coins from OWNER2 to OWNER1 using the CLI transfer-sui command 
sui client transfer-sui --amount 2000 --to $ORIG_OWNER1 --sui-coin-object-id 0x0a76054dce7112846f6e5f8c82faa83a28e88dc9770feb82ec5c54ebc06256e7 --gas-budget 20000
sui client switch --address $ORIG_OWNER1

# OWNER1 requests swap below with a bit above the minimum fee (2000 MIST)
sui client call --gas-budget 20000 --package $PACKAGE --module $MODULE --function "request_swap" --args \
    "0x40e67a09d85126a6df72c3eb70e881288ed3740c6d9db54bba4ae2514663e074" \
    "0x13ac09b757a82a0566d29216027f1ba2c803d2573e4cdfe5c6b39c931544b094" \
    \"$SERVICE_OPERATOR\"

# An ObjectWrapper is created to encapsulate OWNER1's original object and sent to the swap service operator.
# Now the service operator has 2 ObjectWrappers compatible. They can be swapped.
sui client objects $SERVICE_OPERATOR | grep $MODULE | cut -c1-67

# Now the service operator will swap both Objects by unwrapping and sending them back with exchanged owners
sui client switch --address $SERVICE_OPERATOR

sui client objects $ORIG_OWNER1 | grep $MODULE | cut -c1-67
sui client objects $ORIG_OWNER2 | grep $MODULE | cut -c1-67