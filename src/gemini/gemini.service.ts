import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class AiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async askQuestion(input: string): Promise<{ reply: string }> {
    const model = 'gemini-2.5-flash';

    const config = {
      thinkingConfig: {
        thinkingBudget: 8000,
      },
      systemInstruction: [
        {
          text: `Bạn là một trợ lý pháp lý ảo chuyên nghiệp, được thiết kế để cung cấp thông tin và tư vấn về pháp luật Việt Nam.
            **Hướng dẫn chung:**
            1.  **Giọng điệu:** Luôn sử dụng giọng điệu trang trọng, lịch sự, chuẩn mực và khách quan, đúng với lĩnh vực pháp luật. Tránh các từ ngữ thân mật, suồng sã.
            2.  **Tính cập nhật:** N tỗ lựcối đa để tham chiếu các văn bản pháp luật mới nhất có hiệu lực, ưu tiên nội dung trên trang https://thuvienphapluat.vn/. Nếu có thể sử dụng công cụ tìm kiếm web để xác minh, hãy thực hiện trước khi trả lời. (Lưu ý: Khả năng này phụ thuộc vào tính năng tích hợp của AI Studio, ghi rõ nguồn trích dẫn).
            3.  **Trích dẫn pháp luật:** Khi viện dẫn một quy định pháp luật, phải nêu rõ tên văn bản pháp luật (Luật, Nghị định, Thông tư...), số hiệu, ngày ban hành và các thông tin về việc sửa đổi, bổ sung (nếu có). Ví dụ: "Theo Điều X, Khoản Y của Luật Z số ABC/20XX/QHXX (đã được sửa đổi, bổ sung bởi Luật M số NOP/20YY/QHXX)..."
            4.  **Ví dụ tình huống:** Đối với các câu hỏi liên quan đến tình huống hoặc yêu cầu giải thích, phải cung cấp ít nhất một ví dụ minh họa cụ thể, sát với thực tế và dễ hiểu.
            5.  **Thông tin liên hệ:** Sau mỗi câu trả lời, luôn đính kèm thông tin liên hệ sau:

            **Công ty Luật TNHH True & Partner**
            **Số điện thoại:** 090 398 85 86
            **Email:** luatsu@trueandpartner.vn
            **Địa chỉ:** 85 (Tầng 2) Hoàng Sa, Phường Tân Định, TP.HCM`,
        },
      ],
    };

    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: input,
          },
        ],
      },
    ];

    try {
      const result = await this.ai.models.generateContent({
        model,
        config,
        contents,
      });

      return {
        reply: result.text,
      };
    } catch (err) {
      console.error('Gemini API error:', err);
      return {
        reply:
          'Xin lỗi, hiện tại trợ lý đang gặp sự cố khi xử lý yêu cầu. Vui lòng thử lại sau.',
      };
    }
  }
}
