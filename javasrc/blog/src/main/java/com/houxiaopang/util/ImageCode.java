package com.houxiaopang.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.HashMap;
import java.util.Random;

public class ImageCode {
	private final static char[] code = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
			'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a',
			'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
			'w', 'x', 'y', 'z' };
	/**
	 * 制作验证码，并返回HashMap(验证码的值code，和制作的验证码图片image)
	 * @return
	 */
	public static HashMap<String, Object> getImageCode()  {
		int x = 100;
		int y = 32;
		StringBuffer stringBuffer = new StringBuffer();
		BufferedImage image = new BufferedImage(x, y, BufferedImage.TYPE_INT_BGR);
		Graphics g = image.getGraphics();
		Random random = new Random();
		g.setFont(new Font("新宋体", Font.BOLD, 20));
		g.fillRect(0, 0, x, y);
		g.setColor(Color.black);
		g.drawRect(0, 0, x - 1, y - 1);
		int red, green, blue;
		for (int i = 0; i < 4; i++) {
			// 得到随机产生的验证码数字。
			String strRand = String.valueOf(code[random.nextInt(code.length)]);
			// 产生随机的颜色分量来构造颜色值，这样输出的每位数字的颜色值都将不同。
			red = random.nextInt(255);
			green = random.nextInt(255);
			blue = random.nextInt(255);
			// 用随机产生的颜色将验证码绘制到图像中。
			g.setColor(new Color(red, green, blue));
			g.drawString(strRand, (i + 1) * 20, 22);
			stringBuffer.append(strRand);
		}
		for (int i = 0; i < 40; i++) {
			red = random.nextInt(255);
			green = random.nextInt(255);
			blue = random.nextInt(255);
			// 用随机产生的颜色将验证码绘制到图像中。
			g.setColor(new Color(red, green, blue));
			int x1 = random.nextInt(x);
			int y1 = random.nextInt(y);
			int x2 = random.nextInt(12);
			int y2 = random.nextInt(12);
			g.drawLine(x1, y1, x1 + x2, y1 + y2);
		}
		g.dispose();
		HashMap<String, Object> map=new HashMap<>();
		map.put("code", stringBuffer);
		map.put("image", image);
		return map;
	}
}
