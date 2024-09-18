use anchor_lang::prelude::*;

declare_id!("GByuKRFj4fSsR8o6oj8qzGajDFoJZPGZx39dPuZ3h4Ay");

#[program]
pub mod agrotrade {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("AgroTrade marketplace initialized {:?}", ctx.program_id);
        Ok(())
    }

    pub fn create_product(ctx: Context<CreateProduct>, name: String, quantity: u64) -> Result<()> {
        let product = &mut ctx.accounts.product;
        product.owner = ctx.accounts.user.key();
        product.name = name;
        product.quantity = quantity;
        product.is_available = true;
        Ok(())
    }

    pub fn get_user_products(ctx: Context<GetUserProducts>) -> Result<()> {
        // This instruction doesn't modify any state, it just emits events
        let user = ctx.accounts.user.key();

        // Emit an event for each product owned by the user
        for product in ctx.accounts.product_list.iter() {
            if product.owner == user {
                emit!(ProductListed {
                    owner: product.owner,
                    name: product.name.clone(),
                    quantity: product.quantity,
                    is_available: product.is_available,
                });
            }
        }
        Ok(())
    }
}

pub fn create_barter_offer(
    ctx: Context<CreateBarterOffer>,
    offered_quantity: u64,
    requested_product: Pubkey,
    requested_quantity: u64,
) -> Result<()> {
    let barter_offer = &mut ctx.accounts.barter_offer;
    barter_offer.offerer = ctx.accounts.user.key();
    barter_offer.offered_product = ctx.accounts.offered_product.key();
    barter_offer.offered_quantity = offered_quantity;
    barter_offer.requested_product = requested_product;
    barter_offer.requested_quantity = requested_quantity;
    barter_offer.is_active = true;
    Ok(())
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct CreateProduct<'info> {
    #[account(init, payer = user, space = 8 + 32 + 32 + 8 + 1)]
    pub product: Account<'info, Product>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct GetUserProducts<'info> {
    pub user: Signer<'info>,
    #[account(
        constraint = product_list.to_account_info().owner == crate::ID
    )]
    pub product_list: AccountLoader<'info, ProductList>,
}

#[derive(Accounts)]
pub struct CreateBarterOffer<'info> {
    #[account(init, payer = user, space = 8 + 32 + 32 + 8 + 32 + 8 + 1)]
    pub barter_offer: Account<'info, BarterOffer>,
    #[account(mut)]
    pub offered_product: Account<'info, Product>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AcceptBarterOffer<'info> {
    #[account(mut)]
    pub barter_offer: Account<'info, BarterOffer>,
    #[account(mut)]
    pub offered_product: Account<'info, Product>,
    #[account(mut)]
    pub requested_product: Account<'info, Product>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[event]
pub struct ProductListed {
    pub owner: Pubkey,
    pub name: String,
    pub quantity: u64,
    pub is_available: bool,
}

#[account]
pub struct Product {
    pub owner: Pubkey,
    pub name: String,
    pub quantity: u64,
    pub is_available: bool,
}

#[account]
pub struct BarterOffer {
    pub offerer: Pubkey,
    pub offered_product: Pubkey,
    pub offered_quantity: u64,
    pub requested_product: Pubkey,
    pub requested_quantity: u64,
    pub is_active: bool,
}
