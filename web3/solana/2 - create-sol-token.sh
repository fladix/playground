# Command - Create a filesys wallet
# =======
# solana-keygen new
#
# Output
# =======
# Wrote new keypair to /home/iandix/.config/solana/id.json
# pubkey: FAn7nLwyKakguMQGnsNjCCyrssZKA9hhuKihR281ArHQ
# Save this seed phrase and your BIP39 passphrase to recover your new keypair:
# inhale gym pipe detail essay wrestle mobile rhythm curious lounge rhythm hello
 

# Command - Check the config
# ======= 
# solana config get 
#
# Output
# =======
# Config File: /home/iandix/.config/solana/cli/config.yml
# RPC URL: https://api.mainnet-beta.solana.com 
# WebSocket URL: wss://api.mainnet-beta.solana.com/ (computed)
# Keypair Path: /home/iandix/.config/solana/id.json 
# Commitment: confirmed 


# Command - Change config to point to devnet
# ======= 
# solana config set --url https://api.devnet.solana.com 
#
# Output
# =======
# Config File: /home/iandix/.config/solana/cli/config.yml
# RPC URL: https://api.devnet.solana.com 
# WebSocket URL: wss://api.devnet.solana.com/ (computed)
# Keypair Path: /home/iandix/.config/solana/id.json 
# Commitment: confirmed


# Command - Check the key-pair corresponding to the fs wallet
# ======= 
# cat cat ./.config/solana/id.json 
#
# Output
# =======
# [140,44,163,180,68,37,237,152,59,191,58,133,115,81,124,63,190,215,246,85,50,54,112,216,77,71,86,99,96,70,226,228,210,132,219,173,244,181,150,203,127,27,110,132,64,82,45,216,224,40,173,64,189,74,131,207,162,191,138,131,50,50,70,163]


# Command - Check wallet address and balance
# =======
# solana address
# solana balance
# 
# Output
# =======
# FAn7nLwyKakguMQGnsNjCCyrssZKA9hhuKihR281ArHQ
# 0 SOL


# Command - Airdrop SOL to fs wallet
# =======
# solana airdrop 1
# 
# Output
# =======
# Requesting airdrop of 1 SOL
# Signature: 2vjWsTGgwDgjse651sArPpdzLZW8STdGnr9E1yfuninsqmC6btUKkpKFp6cn5YjqZLFprpFFH16Xz4cvGkmCgA6V
# 1 SOL


# Command - Create SPL token (fungible)
# =======
# spl-token create-token
# 
# Output
# =======
# Creating token CoM7cSQWFcpdLFrrDvxn5Jdg4wkfWSdoEqGw7Df3RsoU under program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
# Address:  CoM7cSQWFcpdLFrrDvxn5Jdg4wkfWSdoEqGw7Df3RsoU
# Decimals:  9
# Signature: 4WKeucKd4kL7jCwBRQenRvhExXwyce3NeLCdrdqiLYYpnbzPuic4x3W5aHcaUSDePgTJLEXoTES4TqXbBeZaAc78


# Command - Check supply is zero 
# =======
# spl-token supply CoM7cSQWFcpdLFrrDvxn5Jdg4wkfWSdoEqGw7Df3RsoU
#
# Output
# =======
# 0


# Command - Create token account (to store tokenomics: supply, limits, etc) 
# =======
# spl-token create-account CoM7cSQWFcpdLFrrDvxn5Jdg4wkfWSdoEqGw7Df3RsoU
#
# Output
# =======
# Creating account 7SL3TSZYZYgT4d8nMhtXvHkTb8TvP2Jpso83DEE3RFge
# Signature: WxpvP2ZADqJiAF3ey2FU8dEHEBNSgEfrLSFdAFVA2c7eSUKVJdMpTZMoJ6TuddAZqM5NPm7pAFjPVNiWK5QLhio


# Command - Supply tokens by minting (printing money here) 
# =======
# spl-token mint CoM7cSQWFcpdLFrrDvxn5Jdg4wkfWSdoEqGw7Df3RsoU 1000
#Balance (SOL)	◎0.99090896
# Output
# =======
# Minting 1000 tokens
#   Token: CoM7cSQWFcpdLFrrDvxn5Jdg4wkfWSdoEqGw7Df3RsoU
#   Recipient: 7SL3TSZYZYgT4d8nMhtXvHkTb8TvP2Jpso83DEE3RFge


# Command - Checking supply of tokens and fs wallet balance 
# =======
# spl-token supply CoM7cSQWFcpdLFrrDvxn5Jdg4wkfWSdoEqGw7Df3RsoU
# spl-token balance CoM7cSQWFcpdLFrrDvxn5Jdg4wkfWSdoEqGw7Df3RsoU
#
# Output
# =======
# 1000
# 1000


# Command - Create SPL NFT token (non-fungible)
# =======
# spl-token create-token --decimals 0
# 
# Output
# =======
# Creating token 5vUAGL5SP3LVFpzWxVcmC5wjGbm4smDqFzY9DY6SRTHn under program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
# Address:  5vUAGL5SP3LVFpzWxVcmC5wjGbm4smDqFzY9DY6SRTHn
# Decimals:  0
# Signature: 2TV4yVN3zcf9G6Ue5F6QkiC8a6jqPoFhotXK49LTF6dGbbLnaywXJ2gziJrTmUjAhunSjorBn1p72isUAFnrTRQn


# Command - Create NFT token account 
# =======
# spl-token create-account 5vUAGL5SP3LVFpzWxVcmC5wjGbm4smDqFzY9DY6SRTHn
#
# Output
# =======
# Creating account 7Rfo7Ds4LRHrqtAhy1GiNwpoA9hhmpTRGfr2JGMcHSZc
# Signature: 3sRsw6W3jpSJR56avRXRqQGm5dndShCCFf5vGJ7pynmx1LVNu61Uy8vc9id1DiLTQzb7Wswx1viJ6uckUnBDgdr2


# Command - Mint single NFT token (enforcing non-fungibility) 
# =======
# spl-token mint 5vUAGL5SP3LVFpzWxVcmC5wjGbm4smDqFzY9DY6SRTHn 1 7Rfo7Ds4LRHrqtAhy1GiNwpoA9hhmpTRGfr2JGMcHSZc
#
# Output
# =======
# Minting 1 tokens
#   Token: 5vUAGL5SP3LVFpzWxVcmC5wjGbm4smDqFzY9DY6SRTHn
#   Recipient: 7Rfo7Ds4LRHrqtAhy1GiNwpoA9hhmpTRGfr2JGMcHSZc
# Signature: 5Det34rzTmnKtxnoKSid4GKrU98x32mB74QxL2PoC5sqTYaem63TkmYKggU2i5DcYmb22BJiuoUQc7aKmZmT8CnH


# Command - Disable minting for token to enforce NFT nature 
# =======
# spl-token authorize 5vUAGL5SP3LVFpzWxVcmC5wjGbm4smDqFzY9DY6SRTHn mint --disable
#
# Output
# =======
# Updating 5vUAGL5SP3LVFpzWxVcmC5wjGbm4smDqFzY9DY6SRTHn
#    Current mint authority: FAn7nLwyKakguMQGnsNjCCyrssZKA9hhuKihR281ArHQ
#    New mint authority: disabled
# Signature: 4ALyrQMpqAbbQ1n7F46VPK9q57fCLwtJW9P2g6Fa7xvVa91wtLLWZyWHtaxzqudRQnXGfC6YHvnj7f4GaYfB5hrA


# Command - Listing token accounts 
# =======
# spl-token accounts
#
# Output
# =======
# Token                                         Balance
# -----------------------------------------------------
# 5vUAGL5SP3LVFpzWxVcmC5wjGbm4smDqFzY9DY6SRTHn  1   
# CoM7cSQWFcpdLFrrDvxn5Jdg4wkfWSdoEqGw7Df3RsoU  1000


# Command - Transfer tokens from fs wallet to phatom wallet (fund token account creation on recipient side )
# =======
# spl-token transfer CoM7cSQWFcpdLFrrDvxn5Jdg4wkfWSdoEqGw7Df3RsoU 100 HcG8R8hYmnwhnPbvRwNn3jPUoXiyfahBxzGx8sfj2SPh --fund-recipient
# spl-token transfer 5vUAGL5SP3LVFpzWxVcmC5wjGbm4smDqFzY9DY6SRTHn 1 HcG8R8hYmnwhnPbvRwNn3jPUoXiyfahBxzGx8sfj2SPh --fund-recipient
#
# Output1
# =======
# Transfer 100 tokens
#   Sender: 7SL3TSZYZYgT4d8nMhtXvHkTb8TvP2Jpso83DEE3RFge
#    Recipient: HcG8R8hYmnwhnPbvRwNn3jPUoXiyfahBxzGx8sfj2SPh
#    Recipient associated token account: 4EqwhoUMh4MHabDZCY3HJ6BhAbquyhjEyyntyWF2w9yx
#    Funding recipient: 4EqwhoUMh4MHabDZCY3HJ6BhAbquyhjEyyntyWF2w9yx
# Output2
# =======
# Transfer 1 tokens
#   Sender: 7Rfo7Ds4LRHrqtAhy1GiNwpoA9hhmpTRGfr2JGMcHSZc
#   Recipient: HcG8R8hYmnwhnPbvRwNn3jPUoXiyfahBxzGx8sfj2SPh
#   Recipient associated token account: ALWUzmngsyUsYXQbJXXAsXQZDpJz1Z4m8QHyPqUf9bYt
#   Funding recipient: ALWUzmngsyUsYXQbJXXAsXQZDpJz1Z4m8QHyPqUf9bYt



# Command - Checking supply of tokens and fs wallet balance 
# =======
# spl-token supply CoM7cSQWFcpdLFrrDvxn5Jdg4wkfWSdoEqGw7Df3RsoU
# spl-token balance CoM7cSQWFcpdLFrrDvxn5Jdg4wkfWSdoEqGw7Df3RsoU
#
# Output
# =======
# 1000
# 900


