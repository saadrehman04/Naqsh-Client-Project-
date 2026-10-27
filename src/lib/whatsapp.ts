export const WHATSAPP_NUMBER = "923406119004";
export const DISPLAY_PHONE = "+92 340 6119004";

export function getWhatsAppUrl(message?: string): string {
  const defaultText =
    "Hello Naqsh, I would like to discuss corporate gifting for our business.";
  const encoded = encodeURIComponent(message || defaultText);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function getCollectionWhatsAppUrl(collectionName: string): string {
  const text = `Hello Naqsh, I would like to request a consultation and quote for the ${collectionName} collection.`;
  return getWhatsAppUrl(text);
}
