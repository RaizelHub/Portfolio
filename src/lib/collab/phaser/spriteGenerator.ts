import type Phaser from 'phaser';

/**
 * Procedurally generates pixel-perfect illustrated 2D character textures & animation frames
 * in high-contrast Black & White monochrome aesthetic for male_01 and female_01.
 */
export function generateCharacterTextures(scene: Phaser.Scene): void {
  const characters = ['male_01', 'female_01'] as const;
  const directions = ['down', 'up', 'left', 'right'] as const;
  const frameWidth = 40;
  const frameHeight = 56;

  characters.forEach((characterId) => {
    directions.forEach((direction) => {
      // Generate 4 walking frames (0 = neutral/idle, 1 = left step, 2 = neutral, 3 = right step)
      for (let frame = 0; frame < 4; frame++) {
        const textureKey = `char_${characterId}_${direction}_${frame}`;
        if (scene.textures.exists(textureKey)) continue;

        const canvas = document.createElement('canvas');
        canvas.width = frameWidth;
        canvas.height = frameHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;

        renderCharacterFrame(ctx, characterId, direction, frame, frameWidth, frameHeight);
        scene.textures.addCanvas(textureKey, canvas);
      }
    });
  });
}

function renderCharacterFrame(
  ctx: CanvasRenderingContext2D,
  characterId: 'male_01' | 'female_01',
  direction: 'down' | 'up' | 'left' | 'right',
  frame: number,
  w: number,
  h: number,
): void {
  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const isFemale = characterId === 'female_01';
  // High-contrast Black & White Palette
  const skinColor = '#e2e2e2';
  const hairColor = '#000000';
  const shirtColor = '#ffffff';
  const pantsColor = '#111111';
  const jacketColor = '#000000';
  const shoeColor = '#000000';

  // Walk bob offset
  const bob = frame === 1 || frame === 3 ? 1.5 : 0;
  const legSwing = frame === 1 ? -4 : frame === 3 ? 4 : 0;

  // 1. Drop shadow (Soft dark shadow on light ground)
  ctx.beginPath();
  ctx.ellipse(cx, h - 3, 13, 5, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
  ctx.fill();

  // 2. Legs & Shoes
  const legY = h - 22 - bob;
  const legWidth = isFemale ? 5.5 : 6;
  const legHeight = 16;

  // Left Leg
  ctx.fillStyle = pantsColor;
  const leftLegOffset = direction === 'left' || direction === 'right' ? legSwing : legSwing * 0.7;
  ctx.fillRect(cx - 6.5, legY + leftLegOffset * 0.5, legWidth, legHeight);

  // Right Leg
  ctx.fillRect(cx + 1, legY - leftLegOffset * 0.5, legWidth, legHeight);

  // Shoes (Black Shoes)
  ctx.fillStyle = shoeColor;
  if (direction === 'left') {
    ctx.fillRect(cx - 9, h - 6 + leftLegOffset * 0.5, 7, 4);
    ctx.fillRect(cx - 2, h - 6 - leftLegOffset * 0.5, 6, 4);
  } else if (direction === 'right') {
    ctx.fillRect(cx + 2, h - 6 + leftLegOffset * 0.5, 7, 4);
    ctx.fillRect(cx - 4, h - 6 - leftLegOffset * 0.5, 6, 4);
  } else {
    ctx.fillRect(cx - 7, h - 6 + leftLegOffset * 0.5, 6, 4);
    ctx.fillRect(cx + 1, h - 6 - leftLegOffset * 0.5, 6, 4);
  }

  // 3. Torso / Body
  const torsoY = 16 + bob;
  const torsoWidth = isFemale ? 15 : 18;

  if (isFemale) {
    // Black Blouse
    ctx.fillStyle = jacketColor;
    ctx.fillRect(cx - torsoWidth / 2, torsoY, torsoWidth, 12);
    // White collar V-neck
    ctx.fillStyle = shirtColor;
    ctx.fillRect(cx - 3, torsoY, 6, 5);
    // High-waisted trousers
    ctx.fillStyle = pantsColor;
    ctx.fillRect(cx - torsoWidth / 2, torsoY + 12, torsoWidth, 7);
  } else {
    // Suit Jacket (Black)
    ctx.fillStyle = jacketColor;
    ctx.fillRect(cx - torsoWidth / 2, torsoY, torsoWidth, 18);
    // Crisp White Shirt Inlay
    ctx.fillStyle = shirtColor;
    ctx.fillRect(cx - 3, torsoY + 2, 6, 12);
  }

  // Arms / Hands
  ctx.fillStyle = jacketColor;
  const armOffset = -legSwing * 0.7;
  if (direction === 'left') {
    ctx.fillRect(cx - torsoWidth / 2 - 2, torsoY + 2 + armOffset, 4, 14);
    ctx.fillStyle = skinColor;
    ctx.fillRect(cx - torsoWidth / 2 - 2, torsoY + 16 + armOffset, 4, 3);
  } else if (direction === 'right') {
    ctx.fillRect(cx + torsoWidth / 2 - 2, torsoY + 2 - armOffset, 4, 14);
    ctx.fillStyle = skinColor;
    ctx.fillRect(cx + torsoWidth / 2 - 2, torsoY + 16 - armOffset, 4, 3);
  } else {
    ctx.fillRect(cx - torsoWidth / 2 - 3, torsoY + 2 + armOffset, 3.5, 14);
    ctx.fillRect(cx + torsoWidth / 2 - 0.5, torsoY + 2 - armOffset, 3.5, 14);
    ctx.fillStyle = skinColor;
    ctx.fillRect(cx - torsoWidth / 2 - 3, torsoY + 16 + armOffset, 3.5, 3);
    ctx.fillRect(cx + torsoWidth / 2 - 0.5, torsoY + 16 - armOffset, 3.5, 3);
  }

  // 4. Head & Face
  const headY = 4 + bob;
  const headWidth = 14;
  const headHeight = 13;

  // Neck
  ctx.fillStyle = skinColor;
  ctx.fillRect(cx - 2.5, headY + 10, 5, 4);

  // Face
  ctx.fillStyle = skinColor;
  ctx.fillRect(cx - headWidth / 2, headY, headWidth, headHeight);

  // Hair (Solid Black)
  ctx.fillStyle = hairColor;
  if (direction === 'up') {
    // Back of head full hair
    ctx.fillRect(cx - headWidth / 2 - 1, headY - 2, headWidth + 2, headHeight + (isFemale ? 9 : 2));
  } else if (direction === 'left') {
    ctx.fillRect(cx - headWidth / 2 - 1, headY - 2, headWidth + 1, 6);
    ctx.fillRect(cx + headWidth / 2 - 4, headY, 3, headHeight + (isFemale ? 7 : 0));
    // Eye
    ctx.fillStyle = '#000000';
    ctx.fillRect(cx - 4, headY + 5, 2, 2);
  } else if (direction === 'right') {
    ctx.fillRect(cx - headWidth / 2, headY - 2, headWidth + 1, 6);
    ctx.fillRect(cx - headWidth / 2 + 1, headY, 3, headHeight + (isFemale ? 7 : 0));
    // Eye
    ctx.fillStyle = '#000000';
    ctx.fillRect(cx + 2, headY + 5, 2, 2);
  } else {
    // Front Facing
    ctx.fillRect(cx - headWidth / 2 - 1, headY - 2, headWidth + 2, 5);
    if (isFemale) {
      // Flowing side locks
      ctx.fillRect(cx - headWidth / 2 - 2, headY + 2, 3, headHeight + 5);
      ctx.fillRect(cx + headWidth / 2 - 1, headY + 2, 3, headHeight + 5);
    }
    // Eyes
    ctx.fillStyle = '#000000';
    ctx.fillRect(cx - 4, headY + 5, 2, 2);
    ctx.fillRect(cx + 2, headY + 5, 2, 2);
  }
}
